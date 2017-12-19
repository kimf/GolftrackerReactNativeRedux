import React, { Component } from 'react'
import { FlatList, View /*, DeviceEventEmitter, NativeModules, Platform */ } from 'react-native'
import { connect } from 'react-redux'
import { arrayOf, bool, shape, func, number } from 'prop-types'
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import { NavigationActions } from 'react-navigation'

import Loading from 'shared/Loading'
import TGText from 'shared/TGText'
import Header from 'shared/Header'
import ScoringFooter from 'play/ScoringFooter'
import HoleMap from 'play/HoleMap'
import BottomButton from 'shared/BottomButton'

import { getSlope, getCourse } from 'selectors'
import { fetchHolesIfNeeded } from 'actions/holes'
import { removeShot, setShotData, changeHole, setPos, endRound } from 'actions/play'
import { NAVBAR_HEIGHT, FOOTER_HEIGHT, deviceWidth, deviceHeight } from 'styles'
import { holeShape } from 'propTypes'

// const Location = NativeModules.RNLocation

class Play extends Component {
  static propTypes = {
    loading: bool.isRequired,
    dispatch: func.isRequired,
    slope: shape().isRequired,
    course: shape({
      id: number.isRequired
    }).isRequired,
    holes: arrayOf(holeShape),
    currentHoleIndex: number
  }

  static defaultProps = {
    currentHoleIndex: 0,
    holes: []
  }

  state = { modal: null, position: null }

  async componentWillMount() {
    MapboxGL.setAccessToken(
      'pk.eyJ1Ijoia2ltZiIsImEiOiJjamJiNXJ5b2Ywc2t5MzN0YjhwMWsycTQxIn0.vWT6_dMSH15Lh6dlAbTfMg'
    )
  }

  setShotData = (shot, shotIndex) => {
    const { holeIndex } = this.props
    this.props.dispatch(setShotData(shot, holeIndex, shotIndex))
  }

  removeShot = (holeIndex, shotIndex) => {
    this.props.dispatch(removeShot(holeIndex, shotIndex))
  }

  // componentWillMount() {
  //   if (Platform.OS === 'web') {
  //     this.subscription = navigator.geolocation.watchPosition(
  //       this.updateLocation,
  //       err => {
  //         // eslint-disable-next-line no-console
  //         console.warn(`ERROR(${err.code}): ${err.message}`)
  //       },
  //       {
  //         enableHighAccuracy: true,
  //         timeout: 5000,
  //         maximumAge: 0
  //       }
  //     )
  //   } else {
  //     Location.requestWhenInUseAuthorization()
  //     Location.startUpdatingLocation()
  //     this.subscription = DeviceEventEmitter.addListener('locationUpdated', this.updateLocation)
  //   }
  // }

  async componentDidMount() {
    const { course } = this.props
    this.props.dispatch(fetchHolesIfNeeded(course.id))
  }

  // componentWillUnmount() {
  //   if (Platform.OS === 'web') {
  //     navigator.geolocation.clearWatch(this.subscription)
  //   } else {
  //     Location.stopUpdatingLocation()
  //     DeviceEventEmitter.removeListener('locationUpdated')
  //   }
  // }

  subscription = null

  showModal = modal => this.setState(state => ({ ...state, modal }))

  closeModal = () => this.setState(state => ({ ...state, modal: null }))

  changeHole = index => {
    console.log(index)
    this.props.dispatch(changeHole(index))
    // this.scrollView.scrollToIndex({ animated: true, index })
  }

  updateLocation = position => {
    // eslint-disable-next-line
    this.setState(state => ({ ...state, position }))
  }

  clearGps = holeId => {
    this.props.dispatch(setPos(holeId, [], []))
  }

  cancelPlay = async () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Main' })]
    })
    await this.props.navigation.dispatch(resetAction)
    this.props.dispatch(endRound())
  }

  render() {
    const { loading, holes, currentHoleIndex } = this.props
    const { modal } = this.state
    const currentHole = holes[currentHoleIndex]

    const menuPosition = modal && modal === 'menu' ? 0 : -deviceHeight
    const scorecardPosition = modal && modal === 'scorecard' ? 0 : -deviceHeight

    if (loading) {
      return <Loading text="Laddar håldata, typ" />
    }

    if (!currentHole) {
      return null
    }

    // if (!position) {
    //   return <Loading text="Laddar GPS..." />
    // }

    return (
      <View style={{ flex: 1, alignContent: 'space-around' }}>
        <Header title={`${currentHole.number}`}>
          {currentHole.number > 1 && (
            <TGText
              onPress={() => this.changeHole(currentHoleIndex - 1)}
              style={{ padding: 10, backgroundColor: 'red' }}>
              {`< ${currentHole.number - 1}`}
            </TGText>
          )}
          <TGText>Par: {currentHole.par} - </TGText>
          <TGText>Hcp: {currentHole.currentHoleIndex}</TGText>
          {currentHole.number <= holes.length && (
            <TGText
              onPress={() => this.changeHole(currentHoleIndex + 1)}
              style={{ padding: 10, backgroundColor: 'red' }}>
              {`${currentHole.number + 1} >`}
            </TGText>
          )}
          <TGText
            onPress={() => this.clearGps(currentHole.id)}
            style={{ padding: 10, backgroundColor: 'black' }}>
            RENSA GPS
          </TGText>
        </Header>
        <View style={{ height: deviceHeight - NAVBAR_HEIGHT - FOOTER_HEIGHT }}>
          <HoleMap hole={currentHole} />
        </View>
        <ScoringFooter
          showMenu={() => this.showModal('menu')}
          showScorecard={() => this.showModal('scorecard')}
          showGps={() => this.showModal('gps')}
        />
        <View
          style={{
            top: menuPosition,
            position: 'absolute',
            width: deviceWidth,
            height: deviceHeight,
            backgroundColor: 'red'
          }}>
          <TGText style={{ color: 'white', padding: 20 }} onPress={() => this.closeModal('menu')}>
            STÄNG
          </TGText>

          <BottomButton title="AVBRYT RUNDA" onPress={this.cancelPlay} />
        </View>
        <View
          style={{
            top: scorecardPosition,
            position: 'absolute',
            width: deviceWidth,
            height: deviceHeight,
            backgroundColor: 'red'
          }}>
          <TGText
            style={{ color: 'white', padding: 20 }}
            onPress={() => this.closeModal('scorecard')}>
            SCOREKORT
          </TGText>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.play.loading,
  slope: getSlope(state),
  course: getCourse(state),
  holes: state.play.holes,
  currentHoleIndex: state.play.currentHoleIndex
})

export default connect(mapStateToProps)(Play)
