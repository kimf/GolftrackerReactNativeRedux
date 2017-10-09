import React from 'react'
import { View } from 'react-native'
import { shape, func } from 'prop-types'

import TGText from 'shared/TGText'
import TouchableView from 'shared/TouchableView'
import styles, { colors } from 'styles'

const ClubRow = ({ club, selectClub }) => (
  <TouchableView
    key={`club_row_${club.id}`}
    onPress={() => selectClub(club.id)}
  >
    <View style={styles.listrow}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <TGText style={{ flex: 4, fontWeight: 'bold' }}>
          {club.name}
        </TGText>
        <TGText style={{ flex: 1, fontSize: 14, color: colors.muted }}>
          {club.courses.count} BANOR
        </TGText>
      </View>
    </View>
  </TouchableView>
)

ClubRow.propTypes = {
  club: shape().isRequired,
  selectClub: func.isRequired
}

export default ClubRow
