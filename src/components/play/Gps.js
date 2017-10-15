import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { func, number, shape } from 'prop-types'

import MapView from 'react-native-maps'

import Measurements from 'play/Measurements'


import TGText from 'shared/TGText'
import Loading from 'shared/Loading'
import { colors, deviceHeight } from 'styles'

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
    greenPoint: null,
    measurePoint: null,
    region: null
  }

  componentWillMount() {
    this.setState(state => ({ ...state, region: this.props.position }))
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
    const { close, top, position } = this.props
    const { region, measurePoint, greenPoint } = this.state

    if (!position) {
      return <Loading text="Måste godkänna GPS..." />
    }

    const showMeasurements = measurePoint && greenPoint

    return (
      <View style={[styles.view, { top }]}>
        <View style={styles.container}>
          <MapView
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
  top: number.isRequired,
  position: shape({
    latitude: number.isRequired,
    longitude: number.isRequired,
    latitudeDelta: number.isRequired,
    longitudeDelta: number.isRequired
  }).isRequired
}

export default Gps
