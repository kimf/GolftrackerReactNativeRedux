import React from 'react'
import Listing from 'lists/Listing'
import { Button } from 'react-native'

export default class SlopePicker extends Listing {
  itemType = 'slope'
  title = 'Vilken tee?'
  back = <Button onPress={() => this.resetChoice('course')} title="🔙 BYT BANA" />
}
