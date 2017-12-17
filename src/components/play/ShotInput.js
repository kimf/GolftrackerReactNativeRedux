import React, { Component } from 'react'
import { LayoutAnimation, Platform } from 'react-native'
import { number, func, shape } from 'prop-types'

import { CLUBS, MISS_LIES, LIES, MISSES, GREEN_RESULTS, FAIRWAY_RESULTS } from 'constants'
import GridView from 'play/shots/GridView'
import Putt from 'play/shots/Putt'
import Loading from 'shared/Loading'

export default class ShotInput extends Component {
  static propTypes = {
    index: number.isRequired,
    par: number.isRequired,
    onSetData: func.isRequired,
    shot: shape().isRequired,
    position: shape({
      latitude: number.isRequired,
      longitude: number.isRequired
    }).isRequired
  }

  componentWillReceiveProps() {
    if (Platform.OS !== 'web') LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
  }

  setData = (data) => {
    const { index } = this.props
    this.props.onSetData(data, index)
  }

  addClub = (club) => {
    const { position } = this.props
    this.setData({ club, position })
  }

  addResult = (result) => {
    let goingFor = 'FAIRWAY'
    let success = false
    let endLie = null

    if (['HIT GREEN', 'MISS GREEN', 'IN THE HOLE'].includes(result)) {
      goingFor = 'GREEN'
    }

    if (['HIT GREEN', 'HIT FAIRWAY', 'IN THE HOLE'].includes(result)) {
      success = true
      endLie = goingFor
    }

    if (result === 'IN THE HOLE') {
      endLie = 'HOLE'
    }

    this.setData({ goingFor, success, endLie })
  }

  addLie = (lie) => {
    this.setData({ lie })
  }

  addEndLie = (endLie) => {
    this.setData({ endLie })
  }

  addMissPosition = (missPosition) => {
    this.setData({ missPosition })
  }

  render() {
    const { shot, par } = this.props
    let key = null
    let title = null
    let strong = null
    let items = null
    let onPress = null

    if (!shot.lie) {
      key = 'lie'
      title = 'WHERE DID YOU HIT FROM?'
      items = LIES
      onPress = this.addLie
    } else if (shot.lie === 'GREEN') {
      return <Putt putt={shot} setShotData={this.setData} />
    } else if (!shot.club) {
      key = 'club'
      title = 'WHAT CLUB DID YOU HIT FROM: '
      strong = shot.lie
      items = CLUBS
      onPress = this.addClub
    } else if (!shot.success && !shot.goingFor) {
      key = 'result'
      title = 'WHAT WAS THE RESULT?'
      items = par === 3 ? GREEN_RESULTS : FAIRWAY_RESULTS
      onPress = this.addResult
    } else if (!shot.missPosition && !shot.endLie) {
      key = 'endLie'
      title = 'WHERE DID YOU END UP?'
      onPress = this.addEndLie
      items = MISS_LIES
    } else if (!shot.success && !shot.missPosition) {
      key = 'miss'
      title = 'WHERE DID YOU MISS IT?'
      items = MISSES
      onPress = this.addMissPosition
    }

    if (title && onPress) {
      return (
        <GridView {...{
          key, title, strong, items, onPress
        }}
        />
      )
    }

    return <Loading text="Saving shot..." />
  }
}
