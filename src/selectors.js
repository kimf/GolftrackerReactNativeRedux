export const getClub = state => state.clubs.clubs.find(c => c.id === state.play.club)

export const getCourse = (state) => {
  const club = getClub(state)
  return club.courses.find(c => c.id === state.play.course)
}

export const getSlope = (state) => {
  const course = getCourse(state)
  return course.slopes.find(s => s.id === state.play.slope)
}
