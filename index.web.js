import { AppRegistry } from 'react-native'
import Root from './src/Root'

// Sets up offline caching for all assets (disabled by default)
// You can enable offline caching by changing
// `enableOfflinePlugin` at the top of web/webpack.config.js
if (__OFFLINE__) {
  require('offline-plugin/runtime').install()
}

AppRegistry.registerComponent('Golftracker', () => Root)

AppRegistry.runApplication('Golftracker', { rootTag: window.document.getElementById('react-root') })
