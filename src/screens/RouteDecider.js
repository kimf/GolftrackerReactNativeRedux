import React, { Component } from 'react'
import { View } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { shape, func } from 'prop-types'
import { connect } from 'react-redux'

class RouteDecider extends Component {
  static propTypes = {
    play: shape().isRequired,
    navigation: shape({ dispatch: func.isRequired }).isRequired
  }

  componentDidMount() {
    const { club, course, slope } = this.props.play
    if (club && course && slope) {
      this.navigateTo('Play')
    } else {
      this.navigateTo('Main')
    }
  }

  navigateTo = routeName => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    return <View style={{ flex: 1 }} />
  }
}

const mapStateToProps = state => ({ play: state.play })

export default connect(mapStateToProps)(RouteDecider)
