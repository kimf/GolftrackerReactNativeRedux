import React, { Component } from 'react'
import { View } from 'react-native'
import { shape } from 'prop-types'

import Header from 'shared/Header'

import styles from 'styles'

class Play extends Component {
  static propTypes = {
    club: shape().isRequired,
    course: shape().isRequired,
    slope: shape().isRequired
  }

  setSearchQuery = query => this.setState(state => ({ ...state, query }))

  render() {
    const { club, course, slope } = this.props

    return (
      <View style={styles.container}>
        <Header title="Ja då spelar vi" />
      </View>
    )
  }
}

export default Play

