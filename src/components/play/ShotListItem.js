import React from 'react'
import { View, Button } from 'react-native'
import { /* number, */bool, func, shape } from 'prop-types'

import TGText from 'shared/TGText'
import styles from 'styles'

const ShotListItem = ({ shot, onRemove, isRemovable }) => {
  const {
    lie, club, distanceFromHole, distance,
    proximityToHole, missPosition, endLie
    // success, goingFor
  } = shot

  // const className = success ? 'success' : 'fail'
  // goingFor
  return (
    <View style={styles.listrow}>
      <TGText>
        {lie || ''} ({club})
        {distanceFromHole || ''}{distance || ''}
      </TGText>
      <TGText>{proximityToHole || ''} {missPosition || ''} {endLie || ''}</TGText>
      {isRemovable ? <Button onPress={onRemove} title="x" /> : null}
    </View>
  )
}

ShotListItem.propTypes = {
  shot: shape().isRequired,
  isRemovable: bool,
  // par: number.isRequired,
  onRemove: func.isRequired
}

ShotListItem.defaultProps = { isRemovable: false }

export default ShotListItem
