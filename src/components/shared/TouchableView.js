import React from 'react'
import { TouchableOpacity } from 'react-native'
import { shape, bool, string, oneOfType, array, arrayOf, node } from 'prop-types'
import { colors } from 'styles'

const TouchableView = ({ isRippleDisabled, rippleColor, children, style, ...rest }) => (
  <TouchableOpacity {...rest} style={style}>
    {children}
  </TouchableOpacity>
)

TouchableView.propTypes = {
  isRippleDisabled: bool,
  rippleColor: string,
  children: oneOfType([
    arrayOf(node),
    node
  ]).isRequired,
  style: oneOfType([
    array,
    shape()
  ])
}

TouchableView.defaultProps = {
  isRippleDisabled: true,
  rippleColor: colors.darkGreen,
  style: {}
}

export default TouchableView
