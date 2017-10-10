import React from 'react'
import { View, Button } from 'react-native'
import { string, func } from 'prop-types'

import { CLUBS } from 'constants'
import SubHeader from 'shared/SubHeader'
import TGText from 'shared/TGText'
import styles from 'styles'

const Club = ({ lie, addClub }) => (
  <View style={styles.container}>
    <SubHeader title={`WHAT CLUB DID YOU HIT FROM: ${lie}?`} />
    <View style={styles.gridView}>
      {CLUBS.map(club => (
        <TGText viewStyle={styles.gridButton} style={styles.gridButtonText} key={club} onPress={() => addClub(club)}>
          {club}
        </TGText>
      ))}
    </View>
  </View>
)

Club.propTypes = {
  lie: string.isRequired,
  addClub: func.isRequired
}

export default Club
