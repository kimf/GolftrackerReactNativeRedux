import { shape, number, string } from 'prop-types'

export const scorecardShape = shape({
  id: number.isRequired,
  course: string.isRequired,
  strokes_over_par: number.isRequired
})

export const anotherShape = shape({
  id: string.isRequired
})
