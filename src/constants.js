// export const GREEN_RESULTS = ['HIT GREEN', 'MISS GREEN', 'IN THE HOLE', 'PENALTY']
// export const FAIRWAY_RESULTS = ['HIT FAIRWAY', 'MISS FAIRWAY', 'HIT GREEN', 'MISS GREEN', 'IN THE HOLE', 'PENALTY']
// export const CLUBS = ['Driver', '3W', '3HY', '4', '5', '6', '7', '8', '9', 'PW', 'GW', 'SW', 'LW', 'PUTT']
// export const LIES = ['TEE', 'FAIRWAY', 'ROUGH', 'GREENSIDE ROUGH', 'FRINGE', 'FAIRWAY BUNKER', 'GREENSIDE BUNKER']
// export const MISSES = ['SHORT', 'LEFT', 'LONG', 'RIGHT', 'SHORT LEFT', 'SHORT RIGHT', 'LONG LEFT', 'LONG RIGHT']

export const PUTT_RESULTS = [
  'IN THE HOLE',
  'SHORT',
  'LONG',
  'LEFT',
  'RIGHT',
  'OFF THE GREEN'
]

export const API_URL = (process.env.NODE_ENV === 'development')
  ? 'http://localhost:9292'
  : 'https://golfstats.fransman.se'
