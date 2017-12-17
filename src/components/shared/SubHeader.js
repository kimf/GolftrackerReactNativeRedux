import React, { Component } from 'react'
import { View } from 'react-native'
import { string } from 'prop-types'

import TGText from 'shared/TGText'
import styles, { colors } from 'styles'

class SubHeader extends Component {
  static propTypes = {
    title: string.isRequired,
    color: string,
    backgroundColor: string
  }

  static defaultProps = {
    color: colors.dark,
    backgroundColor: 'transparent'
  }

  render() {
    const { title, backgroundColor, color } = this.props

    return (
      <View style={[styles.subHeader, { backgroundColor }]}>
        <TGText adjustsFontSizeToFitHeight style={[styles.subHeaderTitle, { color }]}>
          {title}
        </TGText>
      </View>
    )
  }
}

export default SubHeader
