import React from 'react'
import { View } from 'react-native'
// import moment from 'moment'
// import 'moment/locale/sv'
// moment(scorecard.date).format('DD MMM YYYY')

import TGText from 'shared/TGText'
import styles from 'styles'
import { scorecardShape } from 'propTypes'

const ScorecardRow = ({ scorecard }) => (
  <View key={scorecard.id} style={styles.listrow}>
    <TGText>{scorecard.course}</TGText>
    <TGText>{scorecard.strokes_over_par}</TGText>
    <TGText>{scorecard.date.toLocaleString('sv-SE')}</TGText>
  </View>
)

// eslint-disable-next-line react/no-typos
ScorecardRow.propTypes = { scorecard: scorecardShape.isRequired }

export default ScorecardRow
