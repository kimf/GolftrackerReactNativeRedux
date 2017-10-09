import React from 'react'
import { View } from 'react-native'

import TGText from 'shared/TGText'
import styles from 'styles'
import { scorecardShape } from 'propTypes'

const ScorecardRow = ({ scorecard }) => (
  <View key={scorecard.id} style={styles.listrow}>
    <TGText>{scorecard.course}</TGText>
    <TGText>{scorecard.strokes_over_par}</TGText>
  </View>
)

ScorecardRow.propTypes = {
  scorecard: scorecardShape.isRequired
}

export default ScorecardRow
