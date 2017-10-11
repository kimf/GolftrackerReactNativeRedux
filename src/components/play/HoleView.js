import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { shape, func, number } from 'prop-types'

import { colors, deviceHeight, deviceWidth, NAVBAR_HEIGHT } from 'styles'
import TGText from 'shared/TGText'
import Header from 'shared/Header'

import ShotListItem from 'play/ShotListItem'
import ShotInput from 'play/ShotInput'

import { removeShot, setShotData } from 'actions/play'

class HoleView extends Component {
  static propTypes = {
    holeIndex: number.isRequired,
    tee: shape().isRequired,
    dispatch: func.isRequired
  }

  setShotData = (shot, shotIndex) => {
    const { holeIndex } = this.props
    this.props.dispatch(setShotData(shot, holeIndex, shotIndex))
  }

  removeShot = (holeIndex, shotIndex) => {
    this.props.dispatch(removeShot(holeIndex, shotIndex))
  }

  render() {
    const { tee, holeIndex } = this.props
    const { hole, shots } = tee

    return (
      <View style={{ flex: 1, backgroundColor: colors.lightGray }}>
        <Header title={`${hole.number}`}>
          <TGText>{tee.length}m - </TGText>
          <TGText>Par: {hole.par} - </TGText>
          <TGText>Hcp: {hole.index}</TGText>
        </Header>
        <View style={{
          margin: 10,
          padding: 10,
          paddingTop: NAVBAR_HEIGHT + 10,
          height: deviceHeight - 20,
          width: deviceWidth - 20,
          backgroundColor: colors.white
        }}
        >
          {shots.map((shot, index) => {
            if (shot.finished) {
              return (
                <ShotListItem
                  shot={shot}
                  par={hole.par}
                  key={`shot_input_${shot.id}_hole_${hole.id}`}
                  onRemove={() => this.removeShot(holeIndex, index)}
                />
              )
            }
            return (
              <ShotInput
                shot={shot}
                par={hole.par}
                key={`shot_input_${shot.id}_hole_${hole.id}`}
                index={index}
                onSetData={this.setShotData}
              />
            )
          })}
        </View>
      </View>
    )
  }
}

export default connect()(HoleView)
