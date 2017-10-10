import React from 'react'
import { View, Button } from 'react-native'
import { /* number, */func, shape } from 'prop-types'

import TGText from 'shared/TGText'

const ShotListItem = ({ shot, onRemove }) => {
  const {
    lie, goingFor, club, distanceFromHole,
    proximityToHole, missPosition, endLie
    // success
  } = shot

  // const className = success ? 'success' : 'fail'
  return (
    <View style={{ flex: 1 }}>
      <TGText>{club}</TGText>
      <TGText>{lie ? (`- lie${lie}`) : ''}</TGText>
      <TGText>{goingFor ? (`- goingFor${goingFor}`) : ''}</TGText>
      <TGText>{distanceFromHole ? (`- distanceFromHole${distanceFromHole}`) : ''}</TGText>
      <TGText>{proximityToHole ? (`- proximityToHole${proximityToHole}`) : ''}</TGText>
      <TGText>{missPosition ? (`- missPosition${missPosition}`) : ''}</TGText>
      <TGText>{endLie}</TGText>
      <Button onPress={onRemove}>x</Button>
    </View>
  )
}

ShotListItem.propTypes = {
  shot: shape().isRequired,
  // par: number.isRequired,
  onRemove: func.isRequired
}

export default ShotListItem
