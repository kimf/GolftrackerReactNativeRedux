import React, { Component } from 'react'
import { Image, View, FlatList, Text } from 'react-native'
import { arrayOf, func, bool } from 'prop-types'
import { connect } from 'react-redux'
import { fetchScorecardsIfNeeded } from 'actions/scorecards'
import { sortedByParsedDate } from 'utils'

import Header from 'shared/Header'
import Loading from 'shared/Loading'

import ScorecardRow from 'scorecards/ScorecardRow'
import { scorecardShape } from 'propTypes'
import styles, { colors, NAVBAR_HEIGHT } from '../styles'

class Scorecards extends Component {
  static propTypes = {
    dispatch: func.isRequired,
    loading: bool.isRequired,
    scorecards: arrayOf(scorecardShape)
  }

  static defaultProps = {
    scorecards: {
      loading: false,
      scorecards: []
    }
  }

  static navigationOptions = {
    tabBarLabel: 'SCOREKORT',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../images/list.png')}
        style={[styles.icon, { tintColor }]}
      />
    )
  }

  componentDidMount() {
    this.props.dispatch(fetchScorecardsIfNeeded())
  }

  render() {
    const { loading, scorecards } = this.props

    if (loading) {
      return <Loading text="Laddar scorekort" />
    }

    if (scorecards.length === 0) {
      return <Text>Inga scorekort</Text>
    }

    return (
      <View style={styles.container}>
        <Header
          title="SCOREKORT"
          backgroundColor={colors.white}
        />
        <FlatList
          removeClippedSubviews={false}
          style={{ backgroundColor: colors.white, marginTop: NAVBAR_HEIGHT, padding: 10 }}
          data={scorecards}
          renderItem={({ item }) => (
            <ScorecardRow scorecard={item} />
          )}
          keyExtractor={item => `event_${item.id}}`}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.scorecards.loading,
  scorecards: sortedByParsedDate(state.scorecards.scorecards, 'date')
})

export default connect(mapStateToProps)(Scorecards)

