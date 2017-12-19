import { StyleSheet, Dimensions } from 'react-native'

export const colors = {
  lightGray: '#ECEBEB',
  green: '#04B742',
  darkGreen: '#058D35',
  mutedGreen: '#D4F4E0',
  dark: '#35383E',
  muted: '#7D8986',
  gray: '#A3A4A6',
  yellow: '#EDD21B',
  mutedYellow: '#F5E682',
  blue: '#3290FC',
  white: '#FFF',
  red: '#E30050'
}

export const NAVBAR_HEIGHT = 80
export const FOOTER_HEIGHT = 40
export const STATUS_BAR_HEIGHT = 20
export const deviceWidth = Dimensions.get('window').width
export const deviceHeight = Dimensions.get('window').height

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'stretch',
    flex: 1
  },
  icon: {
    width: 26,
    height: 26
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
    width: '100%',
    backgroundColor: colors.white,
    marginBottom: 10,
    height: NAVBAR_HEIGHT
  },

  navbarTitle: {
    color: colors.dark,
    fontWeight: '800',
    fontSize: 34,
    textAlign: 'left',
    justifyContent: 'flex-start'
  },

  navbarInner: {
    height: '100%',
    marginLeft: 15,
    backgroundColor: colors.white,
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    paddingTop: STATUS_BAR_HEIGHT * 2,
    paddingRight: STATUS_BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center'
  },

  listrow: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.lightGray,
    flexDirection: 'row',
    padding: 10
  },

  lineBreak: { flexDirection: 'column' },

  gridTitle: {
    fontSize: 24,
    paddingBottom: 20
  },

  gridView: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  gridButton: {
    margin: 5,
    width: '20%',
    height: 60,
    backgroundColor: colors.dark,
    justifyContent: 'center',
    alignItems: 'center'
  },

  gridButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  blockingMessage: {
    height: 40,
    alignItems: 'center',
    backgroundColor: colors.red,
    color: colors.white
  }
})
