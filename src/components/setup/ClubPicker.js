import React, { Component } from 'react'
import { TextInput, View, FlatList } from 'react-native'
import { arrayOf, shape, func } from 'prop-types'

import Header from 'shared/Header'
import ClubRow from 'setup/ClubRow'
import TGText from 'shared/TGText'
import SubHeader from 'shared/SubHeader'

import styles, { colors, NAVBAR_HEIGHT } from 'styles'
import { cacheable } from 'utils'

const fixString = string => string.trim().replace(/-/g, '').replace(/ /g, '').toLowerCase()

const filterCourses = cacheable((courses, query) => courses.filter((c) => {
  const searchString = fixString(`${c.club}${c.name}`)
  const trimmedQuery = fixString(query)
  return searchString.indexOf(trimmedQuery) !== -1
}))

// const getPreviouslyPlayedCourses = cacheable(courses =>
//   courses.filter(c => c.events.count > 0).sort((a, b) => a.events.count - b.events.count))

class ClubPicker extends Component {
  static propTypes = {
    selectClub: func.isRequired,
    clubs: arrayOf(shape())
  }

  static defaultProps = {
    clubs: []
  }

  state = { query: '' }

  setSearchQuery = query => this.setState(state => ({ ...state, query }))

  render() {
    const { clubs, selectClub } = this.props
    const { query } = this.state

    if (clubs.length === 0) {
      return <TGText>Inga banor :(</TGText>
    }

    let filteredClubs = []
    let previously = false
    if (query !== '') {
      previously = false
      filteredClubs = filterCourses(clubs, query)
    } else {
      filteredClubs = clubs
    }

    // else {
    //   previously = true
    //   filteredClubs = getPreviouslyPlayedCourses(clubs)
    // }

    return (
      <View style={styles.container}>
        <Header title="Välj bana" />
        <View style={{ backgroundColor: colors.white, marginTop: NAVBAR_HEIGHT, padding: 10 }}>
          <TextInput
            style={styles.inputField}
            autoCapitalize="words"
            autoCorrect={false}
            placeholder="Sök bana eller klubb"
            returnKeyType="search"
            onChangeText={q => this.setSearchQuery(q)}
            value={query}
          />
        </View>

        {previously
          ? <View
            style={{
              paddingVertical: 20,
              marginHorizontal: 20,
              borderBottomWidth: 2,
              borderBottomColor: colors.lightGray
            }}
          >
            <SubHeader title="Vanliga banor" />
            </View>
          : null
        }

        <FlatList
          removeClippedSubviews={false}
          style={{ paddingHorizontal: 20 }}
          data={filteredClubs}
          renderItem={({ item }) => (
            <ClubRow club={item} selectClub={selectClub} />
          )}
          keyExtractor={item => `course_${item.id}}`}
          keyboardShouldPersistTaps="always"
        />
      </View>
    )
  }
}

export default ClubPicker

