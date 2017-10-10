import React from 'react'
import { View, Button } from 'react-native'
import { func } from 'prop-types'

import TGText from 'shared/TGText'

const Distance = ({ addDistance }) => (
  <View>
    <TGText>WHAT WAS THE DISTANCE TO THE FLAG?</TGText>
    <Button onPress={() => addDistance(125)}>125m</Button>
  </View>
)

Distance.propTypes = {
  addDistance: func.isRequired
}

export default Distance
