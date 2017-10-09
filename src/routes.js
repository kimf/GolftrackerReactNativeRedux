import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation'

import { colors } from 'styles'

import Statistics from 'screens/Statistics'
import Scorecards from 'screens/Scorecards'
import NewRound from 'screens/NewRound'

const TabStack = TabNavigator(
  {
    Statistics: { screen: Statistics },
    Scorecards: { screen: Scorecards },
    NewRound: { screen: NewRound }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    initialRouteName: 'Statistics',
    animationEnabled: false,
    tabBarOptions: {
      inactiveTintColor: colors.muted,
      activeTintColor: colors.blue,
      showIcon: true,
      showLabel: true
    }
  }
)

const MainStack = StackNavigator(
  {
    Main: { screen: TabStack }
    // Here would go modal
  },
  {
    headerMode: 'none',
    initialRouteName: 'Main'
  }

)

export default MainStack
