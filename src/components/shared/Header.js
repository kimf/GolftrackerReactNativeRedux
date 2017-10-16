import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { string, func, oneOfType, arrayOf, node } from 'prop-types'

import TouchableView from 'shared/TouchableView'
import TGText from 'shared/TGText'
import styles, { colors } from 'styles'

class Header extends Component {
  static propTypes = {
    title: string.isRequired,
    children: oneOfType([
      arrayOf(node),
      node
    ]),
    color: string,
    backgroundColor: string,
    goBack: func
  }

  static defaultProps = {
    children: null,
    color: colors.dark,
    backgroundColor: colors.lightGray,
    goBack: null
  }

  renderGoBack = () => (
    <TouchableView
      style={{
        position: 'absolute',
        top: 20,
        right: 10,
        padding: 20
      }}
      onPress={this.props.goBack}
    >
      <Image
        style={{ tintColor: colors.muted }}
        source={require('../../images/close.png')}
      />
    </TouchableView>
  )

  render() {
    const {
      title, children, backgroundColor, color, goBack
    } = this.props

    return (
      <View
        style={[styles.navbar, { backgroundColor }]}
      >
        <View style={[styles.navbarInner, { backgroundColor }]}>
          <TGText adjustsFontSizeToFitHeight style={[styles.navbarTitle, { color }]}>
            {title}
          </TGText>
          {goBack ? this.renderGoBack() : null}
          {children}
        </View>
      </View >
    )
  }
}

export default Header
