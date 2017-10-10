const initialState = {
  loading: false,
  slope: null,
  course: null,
  club: null,
  holes: [],
  currentHoleIndex: 0
}

const FIRST_SHOT = { lie: 'TEE', finished: false }

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
          shots: [FIRST_SHOT]
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
      const searchPath = ['shots', `${action.holeId}`]
      const shotList = state.getIn(searchPath)

      if (shotList === undefined) {
        return state.setIn(searchPath, action.shot)
      }
      // TODO - this seems pretty wrong!
      const oldShot = shotList.get(action.shotIndex)
      let newShot = oldShot.merge(action.shot)

      let finished = false
      // All regular properties are there
      const requiredKeys = ['success', 'lie', 'club', 'goingFor', 'endLie']
      const foundKeys = Object.keys(newShot)
      if (requiredKeys.every(key => foundKeys.indexOf(key) !== -1)) {
        finished = true

        // Special rules apply for Approach shot
        if (newShot.get('goingFor') === 'GREEN') {
          finished = newShot.get('distanceFromHole') !== undefined
        }
        // Special rule for putt
        if (newShot.get('goingFor') === 'HOLE') {
          finished = newShot.get('distance') !== undefined
        }
        // Special rules also apply for Misses
        if (newShot.get('success') === false && !newShot.get('putt')) {
          finished = newShot.get('missPosition') !== undefined
        }
      }

      newShot = newShot.set('finished', finished)
      let newShotList = shotList.set(action.shotIndex, newShot)

      if (newShot.get('finished') && newShot.get('endLie') !== 'IN THE HOLE') {
        newShotList = newShotList.set(action.shotIndex + 1, { lie: newShot.get('endLie') })
      }
      return state.setIn(searchPath, newShotList)
    }

    case 'REMOVE_SHOT': {
      const path = ['shots', `${action.holeId}`]
      const shots = state.getIn(path)
      return state.setIn(path, shots.delete(action.index))
    }

    case 'END_ROUND':
      return initialState

    default:
      return state
  }
}
