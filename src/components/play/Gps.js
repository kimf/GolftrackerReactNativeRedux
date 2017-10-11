import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { func, number } from 'prop-types'

import MapView from 'react-native-maps'

import Measurements from 'play/Measurements'


import TGText from 'shared/TGText'
import Loading from 'shared/Loading'
import { colors, deviceHeight, deviceWidth } from 'styles'

const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.dark,
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'absolute'
  },
  container: {
    height: deviceHeight - 40,
    width: '100%',
    justifyContent: 'flex-start'
  },
  map: { ...StyleSheet.absoluteFillObject },
  footer: {
    height: 40,
    position: 'absolute',
    bottom: 0,
    padding: 10
  },
  text: {
    color: colors.darkGreen,
    fontWeight: 'bold'
  }
})

class Gps extends Component {
  state = {
    region: null,
    position: null,
    measurePoint: null
  }

  componentDidMount = () => {
    navigator.geolocation.watchPosition(
      (result) => {
        const position = {
          latitude: result.coords.latitude,
          longitude: result.coords.longitude,
          latitudeDelta: 0.025,
          longitudeDelta: 0.025 * (deviceHeight - 40)
        }
        const region = this.state.region || position
        this.setState(state => ({ ...state, position, region }))
      },
      null,
      { enableHighAccuracy: true, timeout: 20000, distanceFilter: 0.5 }
    )
  }

  onRegionChange = region => this.setState(state => ({ ...state, region }))

  map = null

  mapWasPressed = (event) => {
    const { coordinate } = event.nativeEvent
    this.setState(state => ({ ...state, measurePoint: { ...coordinate } }))
  }
  greenWantsPos = (event) => {
    const { coordinate } = event.nativeEvent
    this.setState(state => ({ ...state, greenPoint: { ...coordinate } }))
  }

  render() {
    const { close, top } = this.props
    const { region } = this.state
    const { position, measurePoint, greenPoint } = this.state

    if (!position) {
      return <Loading text="Måste godkänna GPS..." />
    }

    const showMeasurements = measurePoint && greenPoint

    return (
      <View style={[styles.view, { top }]}>
        <View style={styles.container}>
          <MapView
            minZoomLevel={16}
            scrollEnabled={false}
            style={styles.map}
            mapType="satellite"
            loadingEnabled
            onRegionChange={this.onRegionChange}
            region={region}
            onPress={this.mapWasPressed}
            onLongPress={this.greenWantsPos}
            onPanDrag={this.mapWasPressed}
          >
            {showMeasurements ? <MapView.Polyline
              coordinates={[position, measurePoint, greenPoint]}
              strokeWidth={5}
              strokeColor={colors.blue}
            /> : null}
            {showMeasurements ? <Measurements
              user={position}
              measurePoint={measurePoint}
              green={greenPoint}
            /> : null}
            {measurePoint ? (
              <MapView.Marker
                pinColor={colors.green}
                coordinate={measurePoint}
                identifier="green"
                draggable
                onDragEnd={this.mapWasPressed}
              >
                <Image
                  source={require('../../images/marker.png')}
                  style={{ height: 40, width: 40, tintColor: colors.white }}
                />
              </MapView.Marker>
            ) : null}
            {greenPoint ? (
              <MapView.Marker
                pinColor={colors.green}
                coordinate={greenPoint}
                identifier="green"
              >
                <Image
                  source={require('../../images/green.png')}
                  style={{ height: 40, width: 40, tintColor: colors.green }}
                />
              </MapView.Marker>
            ) : null}
            <MapView.Marker
              coordinate={position}
              identifier="user"
            >
              <Image
                source={require('../../images/user.png')}
                style={{ height: 40, width: 40, tintColor: colors.yellow }}
              />
            </MapView.Marker>
          </MapView>
        </View>
        <View style={styles.footer}>
          <TGText
            onPress={close}
            viewStyle={styles.button}
            style={[styles.text, styles.leaderboard]}
          >
            STÄNG
          </TGText>
        </View>
      </View>
    )
  }
}

Gps.propTypes = {
  close: func.isRequired,
  top: number.isRequired
}

export default Gps