import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { arrayOf, bool, shape, func, number, string } from 'prop-types'

import Loading from 'shared/Loading'

import HoleView from 'play/HoleView'
import { getClub, getCourse, getSlope } from 'selectors'
import { fetchHolesIfNeeded } from 'actions/holes'
import { changeHole } from 'actions/play'
import { deviceWidth, colors } from 'styles'

class Play extends Component {
  static propTypes = {
    loading: bool.isRequired,
    dispatch: func.isRequired,
    // club: shape().isRequired,
    // course: shape().isRequired,
    slope: shape().isRequired,
    holes: arrayOf(shape({
      id: number.isRequired,
      length: number.isRequired,
      lat: string,
      lng: string,
      hole: shape({
        id: number.isRequired,
        number: number.isRequired,
        par: number.isRequired,
        index: number.isRequired
        // green_center_lat
        // green_center_lng
        // green_front_lat
        // green_front_lng
        // green_depth
      }).isRequired,
      shots: arrayOf(shape()).isRequired
    })).isRequired,
    currentHoleIndex: number
  }

  static defaultProps = { currentHoleIndex: 0 }

  componentDidMount() {
    const { slope } = this.props
    this.props.dispatch(fetchHolesIfNeeded(slope.id))
  }

  handlePageChange = (e) => {
    const { currentHoleIndex } = this.props
    const offset = e.nativeEvent.contentOffset
    if (offset) {
      const page = Math.round(offset.x / deviceWidth) + 1
      if (currentHoleIndex !== page) {
        this.props.dispatch(changeHole(page))
      }
    }
  }

  render() {
    const { loading, holes, currentHoleIndex } = this.props

    const currentHole = holes[currentHoleIndex]

    if (loading) {
      return <Loading text="Laddar håldata, typ" />
    }

    if (!currentHole) {
      return null
    }

    return (
      <View
        style={{
          flex: 1,
          height: '100%',
          alignItems: 'stretch',
          backgroundColor: colors.lightGray
        }}
      >
        <ScrollView
          style={{ width: '100%', height: '100%' }}
          ref={(sv) => { this.scrollView = sv }}
          showsHorizontalScrollIndicator={false}
          scrollEnabled
          onMomentumScrollEnd={this.handlePageChange}
          scrollEventThrottle={1}
          horizontal
          paging
          bounces
          pagingEnabled
          removeClippedSubviews
        >
          {holes.map((h, index) => (
            <HoleView
              key={`hole_view_${h.id}`}
              tee={h}
              isActive={h.number === currentHole.number}
              holesCount={holes.length}
              holeIndex={index}
            />
          ))}
        </ScrollView>
      </View>
    )
  }
}


const mapStateToProps = state => ({
  loading: state.play.loading,
  club: getClub(state),
  course: getCourse(state),
  slope: getSlope(state),
  holes: state.play.holes,
  currentHole: state.play.currentHole
})

export default connect(mapStateToProps)(Play)
