import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { bool, shape, func, number } from 'prop-types'
import MapboxGL from '@mapbox/react-native-mapbox-gl'

import { colors, deviceHeight, deviceWidth } from 'styles'
import TGText from 'shared/TGText'
import Header from 'shared/Header'
import HoleMap from 'play/HoleMap'

// import ShotListItem from 'play/ShotListItem'
// import ShotInput from 'play/ShotInput'

import { removeShot, setShotData } from 'actions/play'

class HoleView extends Component {
  static propTypes = {
    holeIndex: number.isRequired,
    tee: shape().isRequired,
    dispatch: func.isRequired,
    isActive: bool.isRequired
  }

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

  render() {
    const { tee, isActive /* , holeIndex, position */ } = this.props
    const { hole, shots } = tee

    const teePos = { lat: tee.lat, lng: tee.lng }
    const holePos = { lat: hole.green_center_lat, lng: hole.green_center_lng }

    return (
      <View style={{ flex: 1, backgroundColor: colors.lightGray }}>
        <Header title={`${hole.number}`}>
          <TGText>{tee.length}m - </TGText>
          <TGText>Par: {hole.par} - </TGText>
          <TGText>Hcp: {hole.index}</TGText>
          <TGText>Shots: {shots.filter(s => s.finished).length}</TGText>
        </Header>
        <View
          style={{
            margin: 10,
            height: deviceHeight - 60,
            width: deviceWidth - 20,
            backgroundColor: colors.white,
            borderRadius: 10
          }}>
          {isActive && <HoleMap {...{ teePos, holePos }} />}
        </View>
      </View>
    )
  }
}

export default connect()(HoleView)

// {
//   shots.map((shot, index) => {
//     if (shot.finished) {
//       const lastFinishedId = shots.filter(s => s.finished).slice(-1)[0].id
//       return (
//         <ShotListItem
//           shot={shot}
//           par={hole.par}
//           key={`shot_input_${shot.id}_hole_${hole.id}`}
//           isRemovable={shot.id === lastFinishedId}
//           onRemove={() => this.removeShot(holeIndex, index)}
//         />
//       )
//     }
//     return (
//       <ShotInput
//         shot={shot}
//         par={hole.par}
//         key={`shot_input_${shot.id}_hole_${hole.id}`}
//         index={index}
//         position={position}
//         onSetData={this.setShotData}
//       />
//     )
//   })
// }
