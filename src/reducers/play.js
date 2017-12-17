import dotProp from 'dot-prop-immutable'
import { calcDistance } from 'utils'

const makeShot = (holeIndex, lie = 'TEE') => {
  const id = `${Math.floor(Math.random() * 100 + 1)}_${new Date().getTime()}_${holeIndex}`
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
      const prevShot = state.holes[holeIndex].shots[shotIndex - 1]

      let finished = false
      // All regular properties are there
      const requiredKeys = ['success', 'lie', 'club', 'goingFor', 'endLie']
      const foundKeys = Object.keys(newShot)
      if (requiredKeys.every(key => foundKeys.indexOf(key) !== -1)) {
        finished = true

        // Special rule for putt
        if (newShot.goingFor === 'HOLE') {
          finished = newShot.distance !== undefined
        }
        // Special rules also apply for Misses
        if (newShot.success === false && !newShot.putt) {
          finished = newShot.missPosition !== undefined
        }
      }

      if (newShot.endLie) {
        newShot.endLie = newShot.endLie.replace('HIT ', '').replace('MISS ', '')
      }

      newShot.finished = finished

      // update shot data in shot-array
      let newShotList = dotProp.set(
        state,
        `holes.${action.holeIndex}.shots.${action.shotIndex}`,
        newShot
      )

      // we have gotten club, then we can add this clubs startPos
      // as the previous shot's endPos, if there is a prevShot of course
      if (prevShot && shot.club) {
        const distance = calcDistance(prevShot.position, newShot.position)
        const newPrevShot = Object.assign({}, prevShot, { endPosition: newShot.position, distance })
        newShotList = dotProp.set(
          newShotList,
          `holes.${action.holeIndex}.shots.${action.shotIndex - 1}`,
          newPrevShot
        )
      }

      if (newShot.finished && newShot.endLie !== 'IN THE HOLE') {
        // add a new shot with previous shot's endLie
        const addShot = makeShot(holeIndex, newShot.endLie)
        newShotList = dotProp.set(newShotList, `holes.${action.holeIndex}.shots`, shots => [
          ...shots,
          addShot
        ])
      }

      return newShotList
    }

    case 'REMOVE_SHOT': {
      // remove all shots after this one, and create a new one with the new last shots endLie
      const { holeIndex, shotIndex } = action
      const { shots } = state.holes[holeIndex]
      const filteredShots = shots.slice(0, shotIndex)
      const lastShot = filteredShots.filter(s => s.finished).slice(-1)[0]
      const addShot = makeShot(holeIndex, lastShot ? lastShot.endLie : 'TEE')
      const newShotArray = [...filteredShots, addShot]
      return dotProp.set(state, `holes.${holeIndex}.shots`, newShotArray)
    }

    case 'END_ROUND':
      return initialState

    default:
      return state
  }
}
