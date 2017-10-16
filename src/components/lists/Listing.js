import React, { Component } from 'react'
import { View, FlatList, Platform } from 'react-native'
import { arrayOf, func, shape } from 'prop-types'
import { NavigationActions } from 'react-navigation'

import ListItem from 'lists/ListItem'
import WebList from 'lists/WebList'
import { selectItem, deSelectItem } from 'actions/general'

import styles from 'styles'

const ListView = Platform.OS === 'web' ? WebList : FlatList

export default class Listing extends Component {
  static propTypes = {
    dispatch: func.isRequired,
    navigation: shape({ navigate: func.isRequired }).isRequired,
    items: arrayOf(shape()).isRequired
  }

  constructor() {
    super()
    this.itemType = ''
    this.nextStep = ''
    this.resetNavigationOnNextStep = false
  }

  resetChoice = (itemType) => {
    this.props.dispatch(deSelectItem(itemType))
  }

  selectItem = (item) => {
    this.props.dispatch(selectItem(this.itemType, item.id))
    if (this.nextStep) {
      if (this.resetNavigationOnNextStep) {
        const resetAction = NavigationActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({ routeName: this.nextStep })]
        })
        this.props.navigation.dispatch(resetAction)
        // this.navigator.dispatch(actionToDispatch);
      } else {
        this.props.navigation.navigate(this.nextStep)
      }
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <View>
          <ListView
            removeClippedSubviews={false}
            data={this.props.items}
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
