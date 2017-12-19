import { API_URL } from 'appConstants'

export const endRound = () => ({ type: 'END_ROUND' })

export const setShotData = (shot, holeIndex, shotIndex) => ({
  type: 'SET_SHOT_DATA',
  shot,
  holeIndex,
  shotIndex
})

export const removeShot = (holeIndex, shotIndex) => ({ type: 'REMOVE_SHOT', holeIndex, shotIndex })

export const changeHole = index => ({ type: 'CHANGE_HOLE', index })

export const setPos = (id, teePos, holePos) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_HOLE_POS',
      id,
      teePos,
      holePos,
      updatedAt: Date.now()
    })
    return fetch(`${API_URL}/holes/${id}/position`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teePos, holePos })
    }).then(res => console.log('UPDATE_HOLE_POS', res))
  }
}
