import React from 'react'
import { Image } from 'react-native'

import styles from 'styles'

/* eslint-disable react/prop-types */
const navigationOptions = {
  tabBarLabel: 'SPELA GOLF',
  tabBarIcon: ({ tintColor }) => (
    <Image source={require('../../images/play.png')} style={[styles.icon, { tintColor }]} />
  )
}
/* eslint-enable react/prop-types */

export default navigationOptions
