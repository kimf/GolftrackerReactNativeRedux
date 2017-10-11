/* eslint-disable react/prop-types */
import React from 'react'
import { StyleSheet, Text } from 'react-native'

import { colors, deviceWidth, deviceHeight } from 'styles'

import TouchableView from 'shared/TouchableView'

const realWidth = deviceHeight > deviceWidth ? deviceWidth : deviceHeight
const FONT_SIZE = 16
const styles = StyleSheet.create({
  text: {
    fontSize: FONT_SIZE,
    fontFamily: 'System',
    fontWeight: '300',
    color: colors.dark
  }
})

const TGText = ({ onPress, style, viewStyle, children, ...rest }) => {
  const fontSize = style
    ? (StyleSheet.flatten(style).fontSize || FONT_SIZE)
    : FONT_SIZE
  const scaledFontSize = Math.round((fontSize * realWidth) / 375)

  const text = (
    <Text key={`${rest.key}_inner`} style={[styles.text, style, { fontSize: scaledFontSize }]} {...rest}>
      {children}
    </Text>
  )
  return onPress
    ? <TouchableView key={rest.key} style={[viewStyle]} onPress={onPress}>{text}</TouchableView>
    : text
}

export default TGText
/* eslint-enable react/prop-types */
