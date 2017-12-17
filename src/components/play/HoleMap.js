import React from 'react'
import { View } from 'react-native'
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import { arrayOf, number, shape } from 'prop-types'
import { connect } from 'react-redux'

import { getClubPosition } from 'selectors'
import styles from 'styles'
import TGText from '../shared/TGText'

class ShowMap extends React.Component {
  static propTypes = {
    defaultCenter: arrayOf(number.isRequired).isRequired,
    teePos: shape({ lat: number, lng: number }).isRequired,
    holePos: shape({ lat: number, lng: number }).isRequired
  }

  setTeePos = value => {
    console.log(value)
  }

  setHolePos = value => {
    console.log(value)
  }

  render() {
    const { defaultCenter, teePos, holePos } = this.props
    const center = defaultCenter // TODO: How to show both tee + hole as default
    // const heading = calculateHeading()

    let message = null
    let action = null
    console.log(!teePos.lat || !teePos.lng)
    if (!teePos.lat || !teePos.lng) {
      message = (
        <TGText key="message" style={styles.blockingMessage}>
          TEE SAKNAR GPS.. KÖR EN LONG PRESS!
        </TGText>
      )
      action = this.setTeePos
    } else if (!holePos.lat || !holePos.lng) {
      message = (
        <TGText key="message" style={styles.blockingMessage}>
          HÅLET SAKNAR GPS.. KÖR EN LONG PRESS!
        </TGText>
      )
      action = this.setTeePos
    }

    return [
      message,
      <MapboxGL.MapView
        key="map"
        showUserLocation
        centerCoordinate={center}
        userTrackingMode={MapboxGL.UserTrackingModes.None}
        styleURL={MapboxGL.StyleURL.Outdoors}
        style={{ flex: 1 }}
        pitchEnabled={false}
        rotateEnabled={false}
        attributionEnabled={false}
        logoEnabled={false}
        onLongPress={action}
      />
    ]
  }
}

const mapStateToProps = state => ({ defaultCenter: getClubPosition(state) })

export default connect(mapStateToProps)(ShowMap)
