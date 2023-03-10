export const getClub = state => state.clubs.clubs.find(c => c.id === state.play.club)

export const getClubPosition = state => {
  const club = getClub(state)
  return [parseFloat(club.lng), parseFloat(club.lat)]
}

export const getCourse = state => {
  const club = getClub(state)
  return club ? club.courses.find(c => c.id === state.play.course) : null
}

export const getSlope = state => {
  const course = getCourse(state)
  return course ? course.slopes.find(s => s.id === state.play.slope) : null
}
