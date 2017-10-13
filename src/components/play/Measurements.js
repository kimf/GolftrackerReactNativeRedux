import React from 'react'
import { View, StyleSheet } from 'react-native'
import { shape } from 'prop-types'

import { calcDistance } from 'utils'

import TGText from 'shared/TGText'
import { colors } from 'styles'

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 60,
    backgroundColor: colors.lightGray,
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    flex: 1,
    padding: 20,
    color: colors.darkGreen,
    fontWeight: 'bold'
  }
})

const Measurements = ({ user, measurePoint, green }) => (
  <View style={styles.view}>
    <TGText style={styles.label}>
      X: {calcDistance(user, measurePoint)}m
    </TGText>
    <TGText style={styles.label}>
      G: {calcDistance(measurePoint, green)}m
    </TGText>
  </View>
)

Measurements.propTypes = {
  user: shape().isRequired,
  measurePoint: shape().isRequired,
  green: shape().isRequired
}

export default Measurements
