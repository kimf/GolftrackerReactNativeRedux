import React from 'react'
import { View, Button } from 'react-native'
import { func } from 'prop-types'

import { MISSES } from 'constants'
import TGText from 'shared/TGText'

const Miss = ({ addMissPosition }) => (
  <View>
    <TGText>WHERE DID YOU MISS IT?</TGText>
    {MISSES.map((position, index) =>
      <Button key={index} onPress={() => addMissPosition(position)}>{position}</Button>)}
  </View>
)

Miss.propTypes = {
  addMissPosition: func.isRequired
}

export default Miss
