import React from 'react'
import { View, StyleSheet } from 'react-native'
import { func } from 'prop-types'

import TGText from 'shared/TGText'
import { colors } from 'styles'

const styles = StyleSheet.create({
  view: {
    height: 44,
    backgroundColor: colors.green,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
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

const ScoringFooter = ({ showMenu, showScorecard, showGps }) => (
  <View style={styles.view}>
    <TGText
      onPress={() => showMenu()}
      viewStyle={styles.button}
      style={[styles.text, styles.menu]}
    >
      MENY
    </TGText>
    <TGText
      onPress={() => showGps()}
      viewStyle={styles.button}
      style={[styles.text, styles.menu]}
    >
      GPS
    </TGText>
    <TGText
      onPress={() => showScorecard()}
      viewStyle={styles.button}
      style={[styles.text, styles.leaderboard]}
    >
      SCORES
    </TGText>
  </View>
)

ScoringFooter.propTypes = {
  showMenu: func.isRequired,
  showScorecard: func.isRequired,
  showGps: func.isRequired
}

export default ScoringFooter