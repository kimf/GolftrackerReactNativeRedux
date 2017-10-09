import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import { arrayOf, func, shape } from 'prop-types'

import Header from 'shared/Header'

import ListItem from 'lists/ListItem'
import { selectItem, deSelectItem } from 'actions/general'

import styles, { NAVBAR_HEIGHT } from 'styles'

export default class Listing extends Component {
  static propTypes = {
    dispatch: func.isRequired,
    items: arrayOf(shape()).isRequired
  }

  constructor() {
    super()
    this.title = ''
    this.itemType = ''
    this.back = false
  }

  resetChoice = (itemType) => {
    this.props.dispatch(deSelectItem(itemType))
  }

  selectItem = (item) => {
    this.props.dispatch(selectItem(this.itemType, item.id))
  }


  render() {
    const items = this.props.items.sort((a, b) => a.name - b.name)

    return (
      <View style={styles.container}>
        <Header title={this.title} />
        <View style={{ paddingTop: NAVBAR_HEIGHT, paddingHorizontal: 20 }}>
          {this.back ? this.back : ''}
          <FlatList
            removeClippedSubviews={false}
            style={{ paddingHorizontal: 20 }}
            data={items}
            renderItem={({ item }) => (
              <ListItem title={item.name} onPress={() => this.selectItem(item)} />
            )}
            keyExtractor={item => `${this.itemType}_${item.id}}`}
            keyboardShouldPersistTaps="always"
          />
        </View>
      </View>
    )
  }
}
