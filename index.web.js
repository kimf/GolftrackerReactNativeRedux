import React from 'react'
import { AppRegistry } from 'react-native'
import { AppContainer } from 'react-hot-loader'
import Root from './src/Root'

// const OfflinePluginRuntime = require('offline-plugin/runtime');
// if (__OFFLINE__ === true) {
//   OfflinePluginRuntime.install();
// }


AppRegistry.registerComponent('Golftracker', () => Root)

if (module.hot) {
  module.hot.accept()
  const renderHotApp = () => (<AppContainer><Root /></AppContainer>)
  AppRegistry.registerComponent('Golftracker', () => renderHotApp)
}

AppRegistry.runApplication('Golftracker', { rootTag: window.document.getElementById('react-root') })
