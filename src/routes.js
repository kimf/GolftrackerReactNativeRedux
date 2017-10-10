import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation'

import { colors } from 'styles'

import RouteDecider from 'screens/RouteDecider'

import Statistics from 'screens/Statistics'
import Scorecards from 'screens/Scorecards'

import ClubPicker from 'screens/NewRound/ClubPicker'
import CoursePicker from 'screens/NewRound/CoursePicker'
import SlopePicker from 'screens/NewRound/SlopePicker'

import Play from 'screens/Play'

const NewRoundStack = StackNavigator({
  ClubPicker: { screen: ClubPicker },
  CoursePicker: { screen: CoursePicker },
  SlopePicker: { screen: SlopePicker },
  Play: { screen: Play }
})

const TabStack = TabNavigator(
  {
    Statistics: { screen: Statistics },
    Scorecards: { screen: Scorecards },
    NewRound: { screen: NewRoundStack }
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
    RouteDecider: { screen: RouteDecider },
    Main: { screen: TabStack },
    Play: { screen: Play }
  },
  {
    headerMode: 'none',
    initialRouteName: 'RouteDecider'
  }

)

export default MainStack
