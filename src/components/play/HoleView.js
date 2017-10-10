import React from 'react'
import { View } from 'react-native'
import { shape } from 'prop-types'

import styles, { colors, deviceHeight, deviceWidth, NAVBAR_HEIGHT } from 'styles'
import TGText from 'shared/TGText'
import Header from 'shared/Header'

const HoleView = ({ hole }) => {
  console.log(hole)
  return (
    <View style={{ flex: 1, backgroundColor: colors.green }}>
      <Header title={`${hole.hole.number}`} />
      <View style={{
        marginHorizontal: 10,
        marginTop: NAVBAR_HEIGHT + 20,
        height: deviceHeight - 170,
        width: deviceWidth - 20,
        backgroundColor: colors.white,
        borderRadius: 10,
        shadowColor: colors.darkGreen,
        shadowOffset: { width: 5, height: 5 },
        shadowRadius: 1,
        shadowOpacity: 0.5,
        elevation: 5
      }}
      >
        <TGText>{hole.hole.par}</TGText>
      </View>
    </View >
  )
}


HoleView.propTypes = {
  hole: shape().isRequired
}

export default HoleView
