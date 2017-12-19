import { arrayOf, shape, number, string } from 'prop-types'

export const scorecardShape = shape({
  id: number.isRequired,
  course: string.isRequired,
  strokes_over_par: number.isRequired
})

export const anotherShape = shape({ id: string.isRequired })

export const shotShape = shape()

export const holeShape = shape({
  id: number.isRequired,
  number: number.isRequired,
  par: number.isRequired,
  index: number.isRequired,
  hole_pos: arrayOf(number),
  tee_pos: arrayOf(number),
  shots: arrayOf(shotShape.isRequired).isRequired
})
