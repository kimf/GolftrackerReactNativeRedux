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
  length: number.isRequired,
  lat: string,
  lng: string,
  hole: shape({
    number: number.isRequired,
    par: number.isRequired,
    index: number.isRequired
  }),
  shots: arrayOf(shotShape.isRequired).isRequired
})
