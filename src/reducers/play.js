import dotProp from 'dot-prop-immutable'

const makeShot = (holeIndex, lie = 'TEE') => {
  const id = `${Math.floor((Math.random() * 100) + 1)}_${new Date().getTime()}_${holeIndex}`
  return { id, lie, finished: false }
}

const initialState = {
  loading: false,
  slope: null,
  course: null,
  club: null,
  holes: [],
  currentHoleIndex: 0
}

export default function play(state = initialState, action) {
  switch (action.type) {
    case 'SELECT_ITEM': {
      const newState = {}
      newState[action.model] = action.id
      return { ...state, ...newState }
    }

    case 'DE_SELECT_ITEM': {
      const newState = {}
      newState[action.model] = null
      return { ...state, ...newState }
    }

    case 'REQUEST_HOLES':
      return { ...state, loading: true }

    case 'RECEIVE_HOLES': {
      const holes = []
      action.holes.forEach((hole) => {
        const withShot = {
          ...hole,
          shots: [makeShot(hole.id)]
        }
        holes.push(withShot)
      })

      return {
        ...state,
        holes,
        loading: false
      }
    }

    case 'CHANGE_HOLE':
      return { ...state, currentHoleIndex: action.index }

    case 'SET_SHOT_DATA': {
      const { holeIndex, shotIndex, shot } = action
      const newShot = Object.assign({}, state.holes[holeIndex].shots[shotIndex], shot)

      let finished = false
      // All regular properties are there
      const requiredKeys = ['success', 'lie', 'club', 'goingFor', 'endLie']
      const foundKeys = Object.keys(newShot)
      console.log(foundKeys)
      if (requiredKeys.every(key => foundKeys.indexOf(key) !== -1)) {
        console.log('inside special finished loop')
        finished = true

        // Special rules apply for Approach shot
        if (newShot.goingFor === 'GREEN') {
          finished = newShot.distanceFromHole !== undefined
        }
        // Special rule for putt
        if (newShot.goingFor === 'HOLE') {
          finished = newShot.distance !== undefined
        }
        // Special rules also apply for Misses
        if (newShot.success === false && !newShot.putt) {
          finished = newShot.missPosition !== undefined
        }
      }

      newShot.finished = finished

      // update shot data in shot-array
      let newShotList = dotProp.set(state, `holes.${action.holeIndex}.shots.${action.shotIndex}`, newShot)

      if (newShot.finished && newShot.endLie !== 'IN THE HOLE') {
        // add a new shot with previous shot's endLie
        const addShot = makeShot(holeIndex, newShot.endLie)
        newShotList = dotProp.set(state, `holes.${action.holeIndex}.shots`, shots => [...shots, addShot])
      }

      return newShotList
    }

    case 'REMOVE_SHOT':
      return dotProp.delete(state, `holes.${action.holeIndex}.shots.${action.shotIndex}`)

    case 'END_ROUND':
      return initialState

    default:
      return state
  }
}
