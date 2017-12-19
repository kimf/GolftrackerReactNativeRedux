import React from 'react'
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import { arrayOf, number, shape, func } from 'prop-types'
import { connect } from 'react-redux'

import { getClubPosition } from 'selectors'
import { setPos } from 'actions/play'
import styles from 'styles'
import TGText from '../shared/TGText'

const progressListener = (offlineRegion, status) => console.log(offlineRegion, status)
const errorListener = (offlineRegion, err) => console.log(offlineRegion, err)

const hasPositions = hole => hole.teePos && hole.holePos

class HoleMap extends React.Component {
  map = null

  state = {
    center: null,
    hasPositions: null
  }

  static propTypes = {
    defaultCenter: arrayOf(number.isRequired).isRequired,
    hole: shape({
      id: number.isRequired,
      teePos: arrayOf(number),
      holePos: arrayOf(number)
    }).isRequired,
    dispatch: func.isRequired
  }

  onLongPress = (attr, coords) => {
    const hole = { ...this.props.hole }
    if (attr === 'teePos' || attr === 'holePos') {
      hole[attr] = coords
      this.props.dispatch(setPos(hole.id, hole.teePos, hole.holePos))
    }
  }

  getOfflinePack = async (holeId, bounds) => {
    const offlinePack = await MapboxGL.offlineManager.getPack(`hole_${holeId}`)
    if (!offlinePack) {
      MapboxGL.offlineManager.createPack(
        {
          name: `hole_${holeId}`,
          styleURL: MapboxGL.StyleURL.Satellite,
          minZoom: 14,
          maxZoom: 20,
          bounds
        },
        progressListener,
        errorListener
      )
    }
  }

  updateMap = nextHole => {
    const hasPos = hasPositions(nextHole)
    if (hasPos) {
      this.map.setCamera({
        centerCoordinate: nextHole.center,
        zoom: nextHole.zoom || 15,
        heading: nextHole.bearing,
        direction: nextHole.bearing,
        duration: 150
      })
      // this.getOfflinePack(nextHole.id, bounds)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { id, center } = this.props.hole
    const nextHole = nextProps.hole

    const oldProps = JSON.stringify(center)
    const newProps = JSON.stringify(nextHole.center)

    if (id !== nextHole.id || oldProps !== newProps) {
      this.updateMap(nextHole)
    }
  }

  componentDidMount() {
    this.updateMap(this.props.hole)
  }

  componentWillUnmount() {
    MapboxGL.offlineManager.unsubscribe(`hole_${this.props.hole.id}`)
  }

  render() {
    const { hole: { id, teePos, holePos }, defaultCenter } = this.props
    let message = null
    let posKey = null

    if (!teePos) {
      posKey = 'teePos'
      message = (
        <TGText key="message" style={styles.blockingMessage}>
          TEE SAKNAR GPS.. KÖR EN LONG PRESS!
        </TGText>
      )
    } else if (!holePos) {
      posKey = 'holePos'
      message = (
        <TGText key="message" style={styles.blockingMessage}>
          HÅLET SAKNAR GPS.. KÖR EN LONG PRESS!
        </TGText>
      )
    }

    return [
      message,
      <MapboxGL.MapView
        key="map"
        ref={map => {
          this.map = map
        }}
        showUserLocation
        centerCoordinate={defaultCenter}
        userTrackingMode={MapboxGL.UserTrackingModes.None}
        styleURL={MapboxGL.StyleURL.Satellite}
        style={{ flex: 1 }}
        pitchEnabled={false}
        zoomEnabled={false}
        attributionEnabled={false}
        logoEnabled={false}
        compassEnabled={false}
        zoomLevel={16}
        scrollEnabled
        onLongPress={value => this.onLongPress(posKey, value.geometry.coordinates)}
        animated>
        {teePos && <MapboxGL.PointAnnotation id={`hole_${id}`} title="Tee" coordinate={teePos} />}
        {holePos && (
          <MapboxGL.PointAnnotation id={`hole_${id}`} title="Hole" coordinate={holePos} />
        )}
      </MapboxGL.MapView>
    ]
  }
}

const mapStateToProps = state => ({ defaultCenter: getClubPosition(state) })

export default connect(mapStateToProps)(HoleMap)
