import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from 'configureStore'

import Routes from 'routes'

class Root extends Component {
  state = { hasLoaded: false }
  store = configureStore(() => { this.setState({ hasLoaded: true }) })

  render() {
    const { hasLoaded } = this.state

    if (!hasLoaded) {
      return null
    }

    return (
      <Provider store={this.store}>
        <Routes />
      </Provider>
    )
  }
}

export default Root

