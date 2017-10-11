import React from 'react'
import { View, StyleSheet } from 'react-native'
import { func, number } from 'prop-types'

import TGText from 'shared/TGText'
import { colors } from 'styles'

const styles = StyleSheet.create({
  view: {
    height: '100%',
    backgroundColor: colors.green,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    position: 'absolute'
  },
  button: {
    flex: 1,
    padding: 20
  },
  text: {
    color: colors.darkGreen,
    fontWeight: 'bold'
  },
  menu: { textAlign: 'left' },
  leaderboard: { textAlign: 'right' }
})

const Gps = ({ close, top }) => (
  <View style={[styles.view, { top }]}>
    <View style={styles.footer}>
      <TGText
        onPress={close}
        viewStyle={styles.button}
        style={[styles.text, styles.leaderboard]}
      >
        STÄNG
      </TGText>
    </View>
  </View>
)

Gps.propTypes = {
  close: func.isRequired,
  top: number.isRequired
}

export default Gps
