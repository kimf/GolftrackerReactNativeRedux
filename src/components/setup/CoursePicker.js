import React from 'react'
import Listing from 'lists/Listing'
import { Button } from 'react-native'

export default class CoursePicker extends Listing {
  itemType = 'course'
  title = 'Vilken bana?'
  back = <Button onPress={() => this.resetChoice('club')} title="🔙 BYT KLUBB" />
}
