import React, { Component } from 'react'
import { LayoutAnimation } from 'react-native'
import { number, func, shape } from 'prop-types'

import { CLUBS, LIES, MISSES, GREEN_RESULTS, FAIRWAY_RESULTS } from 'constants'
import GridView from 'play/shots/GridView'
import Putt from 'play/shots/Putt'
import Loading from 'shared/Loading'

export default class ShotInput extends Component {
  static propTypes = {
    index: number.isRequired,
    par: number.isRequired,
    onSetData: func.isRequired,
    shot: shape().isRequired
  }

  componentWillReceiveProps() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
  }

  setData = (data) => {
    const { index } = this.props
    this.props.onSetData(data, index)
  }

  addClub = (club) => {
    this.setData({ club })
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

  addDistance = (distanceFromHole) => {
    this.setData({ distanceFromHole })
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
      items = LIES
    } else if (!shot.success && !shot.missPosition) {
      key = 'miss'
      title = 'WHERE DID YOU MISS IT?'
      items = MISSES
      onPress = this.addMissPosition
    } else if (shot.goingFor === 'GREEN' && !shot.distanceFromHole) {
      key = 'distance'
      title = 'WHAT WAS THE DISTANCE TO FLAG?'
      items = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(String)
      onPress = this.addDistance
    }

    if (title && onPress) {
      return (
        <GridView {...{ key, title, strong, items, onPress }} />
      )
    }

    return <Loading text="Saving shot..." />
  }
}
