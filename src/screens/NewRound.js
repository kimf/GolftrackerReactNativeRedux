import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { connect } from 'react-redux'
import { arrayOf, shape, func, bool, number } from 'prop-types'

import { fetchClubsIfNeeded } from 'actions/clubs'
import { selectItem } from 'actions/general'

import Loading from 'shared/Loading'
import ClubPicker from 'setup/ClubPicker'
import CoursePicker from 'setup/CoursePicker'
import SlopePicker from 'setup/SlopePicker'
import Play from 'play/Play'

import styles from 'styles'

class NewRound extends Component {
  static navigationOptions = {
    tabBarLabel: 'SPELA GOLF',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../images/play.png')}
        style={[styles.icon, { tintColor }]}
      />
    )
  }

  static propTypes = {
    navigation: shape({
      goBack: func.isRequired
    }).isRequired,
    loading: bool,
    dispatch: func.isRequired,
    clubs: arrayOf(shape()),
    club: number,
    course: number,
    slope: number
  }

  static defaultProps = {
    loading: true,
    clubs: [],
    club: null,
    slope: null,
    course: null
  }

  componentDidMount() {
    this.props.dispatch(fetchClubsIfNeeded())
  }

  setClub = (club) => {
    this.props.dispatch(selectItem('club', club))
  }

  resumeRound() {
    const { navigate } = this.props.navigation
    navigate('Play')
  }

  render() {
    const {
      clubs, club, course, slope, loading, dispatch
    } = this.props
    let content = null

    if (loading) {
      return <Loading text="Laddar massa data..." />
    }

    let courses = null
    let clubItem = null
    if (club !== null) {
      clubItem = clubs.find(c => c.id === club)
      courses = clubItem.courses
    }

    let slopes = null
    let courseItem = null
    if (course !== null) {
      courseItem = courses.find(c => c.id === course)
      slopes = courseItem.slopes
    }

    if (slope) {
      const slopeItem = slopes.find(s => s.id === slope)
      content = <Play club={clubItem} course={courseItem} slope={slopeItem} />
    } else if (course) {
      content = <SlopePicker items={slopes} dispatch={dispatch} />
    } else if (club) {
      content = <CoursePicker items={courses} dispatch={dispatch} />
    } else {
      content = <ClubPicker clubs={clubs} selectClub={this.setClub} />
    }

    return (
      <View style={styles.container}>
        {content}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  ...state.clubs,
  club: state.play.club,
  course: state.play.course,
  slope: state.play.slope
})

export default connect(mapStateToProps)(NewRound)
