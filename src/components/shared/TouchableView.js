import React from 'react'
import { View, TouchableNativeFeedback, TouchableOpacity, Platform } from 'react-native'
import { shape, bool, string, oneOfType, array, arrayOf, node } from 'prop-types'
import { colors } from 'styles'

const TouchableView = ({
  isRippleDisabled, rippleColor, children, style, ...rest
}) => {
  if (Platform.OS === 'android') {
    const background = TouchableNativeFeedback.Ripple(rippleColor, false)
    return (
      <TouchableNativeFeedback {...rest} background={background}>
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    )
  }

  return (
    <TouchableOpacity {...rest} style={style}>
      {children}
    </TouchableOpacity>
  )
}

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
