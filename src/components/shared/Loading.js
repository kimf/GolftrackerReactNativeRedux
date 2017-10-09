import React from 'react'
import { View } from 'react-native'
import { string } from 'prop-types'

import TGText from 'shared/TGText'
import { colors } from 'styles'

const containerStyle = {
  backgroundColor: colors.lightGray,
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1
}

const textStyle = {
  fontWeight: 'bold',
  fontSize: 24,
  color: colors.muted
}

const Loading = ({ text }) => (
  <View style={containerStyle}>
    <TGText style={textStyle}>{text}</TGText>
  </View>
)


Loading.propTypes = {
  text: string
}

Loading.defaultProps = {
  text: 'Startar upp...'
}

export default Loading
