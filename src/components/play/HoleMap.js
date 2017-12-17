import React from 'react'
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import geoViewport from '@mapbox/geo-viewport'
import { arrayOf, number, shape, func } from 'prop-types'
import { connect } from 'react-redux'

import { getClubPosition } from 'selectors'
import { setPos } from 'actions/play'
import styles, { deviceWidth, deviceHeight } from 'styles'
import TGText from '../shared/TGText'

class ShowMap extends React.Component {
  map = null

  static propTypes = {
    defaultCenter: arrayOf(number.isRequired).isRequired,
    tee: shape({
      id: number.isRequired,
      lat: number,
      lng: number,
      hole: shape({
        id: number.isRequired,
        green_center_lat: number,
        green_center_lng: number
      }).isRequired
    }).isRequired,
    dispatch: func.isRequired
  }

  setPos = (model, coords) => {
    const { tee } = this.props
    const id = model === 'tee' ? tee.id : tee.hole.id
    this.props.dispatch(setPos(model, id, coords[0], coords[1]))

    if (model === 'hole') {
      this.map.fitBounds([tee.lat, tee.lng], [coords[0], coords[1]])
    } else {
      this.map.moveTo([coords[0], coords[1]])
    }
  }

  // componentDidMount() {
  //   const { lat, lng, hole: { green_center_lat, green_center_lng } } = this.props.tee
  //   if (lat && lng && green_center_lat && green_center_lng && this.map) {
  //     console.log(lat, lng)
  //     console.log(green_center_lat, green_center_lng)
  //     this.map.fitBounds([lat, lng], [green_center_lat, green_center_lng], 20)
  //   }
  // }

  render() {
    const { defaultCenter, tee } = this.props
    const { hole } = tee

    let center = defaultCenter
    let zoom = 18
    // const heading = calculateHeading()

    const teePos = { lat: tee.lat, lng: tee.lng }
    const holePos = { lat: hole.green_center_lat, lng: hole.green_center_lng }

    let message = null
    let model = null
    if (!teePos.lat || !teePos.lng) {
      model = 'tee'
      message = (
        <TGText key="message" style={styles.blockingMessage}>
          TEE SAKNAR GPS.. KÖR EN LONG PRESS!
        </TGText>
      )
    } else if (!holePos.lat || !holePos.lng) {
      model = 'hole'
      message = (
        <TGText key="message" style={styles.blockingMessage}>
          HÅLET SAKNAR GPS.. KÖR EN LONG PRESS!
        </TGText>
      )
    } else {
      const bounds = geoViewport.viewport(
        [teePos.lat, teePos.lng, holePos.lat, holePos.lng],
        [deviceWidth, deviceHeight]
      )
      center = bounds.center
      zoom = bounds.zoom
    }

    return [
      message,
      <MapboxGL.MapView
        key="map"
        ref={map => {
          this.map = map
        }}
        showUserLocation
        centerCoordinate={center}
        zoom={zoom}
        userTrackingMode={MapboxGL.UserTrackingModes.None}
        styleURL={MapboxGL.StyleURL.Outdoors}
        style={{ flex: 1 }}
        pitchEnabled={false}
        rotateEnabled={false}
        attributionEnabled={false}
        logoEnabled={false}
        onLongPress={value => this.setPos(model, value.geometry.coordinates)}
      />
    ]
  }
}

const mapStateToProps = state => ({ defaultCenter: getClubPosition(state) })

export default connect(mapStateToProps)(ShowMap)
