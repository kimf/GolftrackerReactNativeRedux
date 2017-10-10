import React from 'react'
import { Image } from 'react-native'
import styles from 'styles'

const navigationOptions = {
  tabBarLabel: 'SPELA GOLF',
  tabBarIcon: ({ tintColor }) => (
    <Image
      source={require('../../images/play.png')}
      style={[styles.icon, { tintColor }]}
    />
  )
}

export default navigationOptions
