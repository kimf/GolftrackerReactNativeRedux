import React, { Component } from 'react'
import { Image, View, Text } from 'react-native'

import Header from 'shared/Header'

import styles, { colors } from '../styles'

class Statistics extends Component {
  static navigationOptions = () => ({
    tabBarLabel: 'STATISTIK',
    tabBarIcon: ({ tintColor }) => (
      <Image source={require('../images/graph.png')} style={[styles.icon, { tintColor }]} />
    ),
    title: 'STATISTICS'
  })

  render() {
    return (
      <View style={styles.container}>
        <Header title="STATISTIK" backgroundColor={colors.white} />
        <Text>Hello, STATISTIK!</Text>
      </View>
    )
  }
}

export default Statistics
