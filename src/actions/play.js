export const endRound = () => ({
  type: 'END_ROUND'
})

export const setShotData = (shot, holeId, shotIndex) => ({
  type: 'SET_SHOT_DATA', shot, holeId, shotIndex
})

export const removeShot = (holeId, index) => ({
  type: 'REMOVE_SHOT', holeId, index
})

export const changeHole = index => ({
  type: 'CHANGE_HOLE', index
})
