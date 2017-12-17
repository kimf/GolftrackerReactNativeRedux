import React, { Component } from 'react'
import { ScrollView, View /*, DeviceEventEmitter, NativeModules, Platform */ } from 'react-native'
import { connect } from 'react-redux'
import { arrayOf, bool, shape, func, number } from 'prop-types'

import Loading from 'shared/Loading'
import TGText from 'shared/TGText'
import HoleView from 'play/HoleView'
import ScoringFooter from 'play/ScoringFooter'

import { getSlope } from 'selectors'
import { fetchHolesIfNeeded } from 'actions/holes'
import { changeHole } from 'actions/play'
import { deviceWidth, deviceHeight, colors } from 'styles'
import { holeShape } from 'propTypes'

// const Location = NativeModules.RNLocation

class Play extends Component {
  static propTypes = {
    loading: bool.isRequired,
    dispatch: func.isRequired,
    slope: shape().isRequired,
    holes: arrayOf(holeShape),
    currentHoleIndex: number
  }

  static defaultProps = {
    currentHoleIndex: 0,
    holes: []
  }

  state = { modal: null, position: null }

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

  componentDidMount() {
    const { slope } = this.props
    this.props.dispatch(fetchHolesIfNeeded(slope.id))
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

  handlePageChange = e => {
    const { currentHoleIndex } = this.props
    const offset = e.nativeEvent.contentOffset
    if (offset) {
      const page = Math.round(offset.x / deviceWidth) + 1
      if (currentHoleIndex !== page) {
        this.props.dispatch(changeHole(page - 1))
      }
    }
  }

  updateLocation = position => {
    // eslint-disable-next-line
    this.setState(state => ({ ...state, position }))
  }

  render() {
    const { loading, holes, currentHoleIndex } = this.props
    const { modal, position } = this.state
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
      <View
        style={{
          flex: 1,
          height: '100%',
          alignItems: 'stretch',
          backgroundColor: colors.lightGray
        }}>
        <ScrollView
          style={{ width: '100%', height: '100%' }}
          ref={sv => {
            this.scrollView = sv
          }}
          showsHorizontalScrollIndicator={false}
          scrollEnabled
          onMomentumScrollEnd={this.handlePageChange}
          scrollEventThrottle={1}
          horizontal
          paging
          bounces
          pagingEnabled
          removeClippedSubviews>
          {holes.map((h, index) => (
            <HoleView
              key={`hole_view_${h.id}`}
              position={position}
              tee={h}
              isActive={h.hole.number === currentHole.hole.number}
              holesCount={holes.length}
              holeIndex={index}
            />
          ))}
        </ScrollView>
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
            MENY
          </TGText>
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
  holes: state.play.holes,
  currentHoleIndex: state.play.currentHoleIndex
})

export default connect(mapStateToProps)(Play)
