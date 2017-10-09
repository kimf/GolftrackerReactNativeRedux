import Statistics from 'screens/Statistics'
import Scorecards from 'screens/Scorecards'

import { TabNavigator } from 'react-navigation'

import { colors } from 'styles'

const screens = {
  Scorecards: {
    screen: Scorecards
  },
  Statistics: {
    screen: Statistics
  }
}

const TabStack = TabNavigator(
  screens,
  {
    tabBarPosition: 'bottom',
    animationEnabled: false,
    tabBarOptions: {
      activeTintColor: colors.blue
    }
  }
)

export default TabStack
