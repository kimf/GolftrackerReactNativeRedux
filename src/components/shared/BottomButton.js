import React from 'react'
import { StyleSheet } from 'react-native'
import { string, func } from 'prop-types'

import TGText from 'shared/TGText'
import { colors } from 'styles'

const styles = StyleSheet.create({
  button: {
    padding: 25,
    width: '100%',
    alignSelf: 'flex-end'
  },

  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14
  }
})

const BottomButton = ({ title, onPress, backgroundColor, color }) => (
  <TGText
    viewStyle={[styles.button, { backgroundColor }]}
    style={[styles.text, { color }]}
    onPress={onPress}>
    {title}
  </TGText>
)

BottomButton.propTypes = {
  title: string.isRequired,
  onPress: func.isRequired,
  backgroundColor: string,
  color: string
}

BottomButton.defaultProps = {
  backgroundColor: colors.green,
  color: colors.white
}

export default BottomButton
