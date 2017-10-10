import React, { Component } from 'react'
import { shape, func } from 'prop-types'

// import { PUTT_RESULTS } from 'constants'

export default class Putt extends Component {
  static propTypes = {
    putt: shape().isRequired,
    setShotData: func.isRequired
  }

  addResult = (result) => {
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
    this.props.setShotData({
      putt: true, result, endLie, success, club, goingFor
    })
  }

  addDistance = () => this.props.setShotData({ putt: true, distance: 2 })

  renderResults = (result, index) => (
    <button key={index} className="bigass" onClick={() => this.addResult(result)}>{result}</button>
  )

  render() {
    const { putt } = this.props


    if (!putt.result) {
      return (
        <div className="putt">
          <h6>WHERE DID YOU PUTT IT?</h6>
          {this.putt_results.map(this.renderResults())}
        </div>
      )
    }

    if (!putt.distance) {
      return (
        <div className="putt">
          <h6>WHAT WAS THE DISTANCE TO THE FLAG?</h6>
          <button className="bigass" onClick={this.addDistance}>2m</button>
        </div>
      )
    }

    return <div>Saving putt...</div>
  }
}
