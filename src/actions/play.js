export const endRound = () => ({ type: 'END_ROUND' })

export const setShotData = (shot, holeIndex, shotIndex) => ({
  type: 'SET_SHOT_DATA',
  shot,
  holeIndex,
  shotIndex
})

export const removeShot = (holeIndex, shotIndex) => ({ type: 'REMOVE_SHOT', holeIndex, shotIndex })

export const changeHole = index => ({ type: 'CHANGE_HOLE', index })
