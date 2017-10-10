import React, { Component } from 'react'
import { number, func, shape } from 'prop-types'

import Result from 'play/shots/Result'
import Club from 'play/shots/Club'
import Lie from 'play/shots/Lie'
import Miss from 'play/shots/Miss'
import Distance from 'play/shots/Distance'
import Putt from 'play/shots/Putt'

import Loading from 'shared/Loading'

export default class ShotInput extends Component {
  static propTypes = {
    index: number.isRequired,
    par: number.isRequired,
    onSetData: func.isRequired,
    shot: shape().isRequired
  }

  setData = (data) => {
    const { index } = this.props
    this.props.onSetData(data, index)
  }

  addClub = (club) => {
    this.setData({ club })
  }

  addResult(result) {
    let goingFor = 'FAIRWAY'
    let success = false
    const endLie = result.split(' ').slice(-1)

    if (['HIT GREEN', 'MISS GREEN', 'IN THE HOLE'].includes(result)) {
      goingFor = 'GREEN'
    }

    if (['HIT GREEN', 'HIT FAIRWAY', 'IN THE HOLE'].includes(result)) {
      success = true
    }

    this.setData({ goingFor, success, endLie })
  }

  addDistance(distanceFromHole) {
    this.setData({ distanceFromHole })
  }

  addLie(lie) {
    this.setData({ lie })
  }

  addEndLie(endLie) {
    this.setData({ endLie })
  }

  addMissPosition(missPosition) {
    this.setData({ missPosition })
  }

  render() {
    const { shot, par } = this.props

    if (!shot.lie) {
      return <Lie title="Where did you hit from?" addLie={this.addLie} />
    }

    if (shot.lie === 'GREEN') {
      return <Putt putt={shot} setShotData={this.setData} />
    }

    if (!shot.club) {
      return <Club lie={shot.lie} addClub={this.addClub} />
    }

    if (!shot.success && !shot.goingFor) {
      return <Result par={par} addResult={this.addResult} />
    }

    if (!shot.missPosition && !shot.endLie) {
      return <Lie title="Where did you end up?" addLie={this.addEndLie} />
    }

    if (!shot.success && !shot.missPosition) {
      return <Miss shot={shot} addMissPosition={this.addMissPosition} />
    }

    if (shot.goingFor === 'GREEN' && !shot.distanceFromHole) {
      return <Distance shot={shot} addDistance={this.addDistance} />
    }

    return <Loading text="Saving shot..." />
  }
}
