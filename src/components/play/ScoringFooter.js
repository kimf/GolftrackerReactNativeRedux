import React from 'react'
import { View, StyleSheet } from 'react-native'
import { func } from 'prop-types'

import TGText from 'shared/TGText'
import { colors } from 'styles'

const styles = StyleSheet.create({
  view: {
    height: 40,
    backgroundColor: colors.dark,
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

const ScoringFooter = ({ showMenu, showScorecard }) => (
  <View style={styles.view}>
    <TGText onPress={() => showMenu()} viewStyle={styles.button} style={[styles.text, styles.menu]}>
      MENY
    </TGText>
    <TGText
      onPress={() => showScorecard()}
      viewStyle={styles.button}
      style={[styles.text, styles.leaderboard]}>
      SCORES
    </TGText>
  </View>
)

ScoringFooter.propTypes = {
  showMenu: func.isRequired,
  showScorecard: func.isRequired
}

export default ScoringFooter
