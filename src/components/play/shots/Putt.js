import React, { Component } from 'react'
import { shape, func } from 'prop-types'

import { PUTT_RESULTS } from 'appConstants'
import GridView from 'play/shots/GridView'

export default class Putt extends Component {
  static propTypes = {
    putt: shape().isRequired,
    setShotData: func.isRequired
  }

  addResult = result => {
    let endLie = null
    let success = false
    const club = 'PUTTER'
    const goingFor = 'HOLE'

    if (result === 'OFF THE GREEN') {
      endLie = null
    } else if (result === 'IN THE HOLE') {
      success = true
      endLie = 'IN THE HOLE'
    } else {
      endLie = 'GREEN'
    }
    this.props.setShotData({ putt: true, result, endLie, success, club, goingFor })
  }

  addDistance = () => this.props.setShotData({ putt: true, distance: 2 })

  renderResults = (result, index) => (
    <button key={index} className="bigass" onClick={() => this.addResult(result)}>
      {result}
    </button>
  )

  render() {
    const { putt } = this.props

    if (!putt.result) {
      return (
        <GridView title="WHERE DID YOU PUT IT?" items={PUTT_RESULTS} onPress={this.addResult} />
      )
    }

    if (!putt.distance) {
      return (
        <GridView
          title="WHAT WAS THE DISTANCE TO THE FLAG?"
          items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(String)}
          onPress={this.addDistance}
        />
      )
    }

    return <div>Saving putt...</div>
  }
}
