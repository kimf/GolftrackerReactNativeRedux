import React from 'react'
import { View, Button } from 'react-native'
import { func, string } from 'prop-types'

import TGText from 'shared/TGText'
import { LIES } from 'constants'

const Lie = ({ addLie, title }) => (
  <View>
    <TGText>{title}</TGText>
    {
      LIES.map((lie, index) =>
        <Button className="bigass" key={index} onPress={() => addLie(lie)}>{lie}</Button>)
    }
  </View>
)


Lie.propTypes = {
  addLie: func.isRequired,
  title: string.isRequired
}

export default Lie
