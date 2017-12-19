import React from 'react'
import { TextInput, View, FlatList } from 'react-native'
import { connect } from 'react-redux'

import { sortedByName, cacheable } from 'utils'
import { fetchClubsIfNeeded } from 'actions/clubs'
import TGText from 'shared/TGText'
import Listing from 'lists/Listing'
import ListItem from 'lists/ListItem'
import navOptions from './navigationOptions'

const fixString = stringToFix =>
  stringToFix
    .trim()
    .replace(/-/g, '')
    .replace(/ /g, '')
    .toLowerCase()

const filterCourses = cacheable(
  (clubs, query) =>
    clubs.filter(c => {
      const searchString = fixString(`${c.name}`)
      const trimmedQuery = fixString(query)
      return searchString.indexOf(trimmedQuery) !== -1
    })
  // .sort((a, b) => b.eventCount - a.eventCount)
  // .sort((a, b) => a.name - b.name)
)

const getPreviouslyPlayedCourses = cacheable(courses =>
  courses.filter(c => c.eventCount > 3).sort((a, b) => b.eventCount - a.eventCount)
)

class ClubPicker extends Listing {
  itemType = 'club'
  nextStep = 'CoursePicker'

  static navigationOptions = {
    ...navOptions,
    title: 'Välj klubb'
  }

  componentDidMount() {
    this.props.dispatch(fetchClubsIfNeeded())
  }

  state = { query: '' }

  setSearchQuery = query => this.setState(state => ({ ...state, query }))

  render() {
    const { query } = this.state

    let courses = []
    let previously = false
    if (query !== '' && query.length > 1) {
      previously = false
      courses = filterCourses(this.props.items, query)
    } else {
      previously = true
      courses = getPreviouslyPlayedCourses(this.props.items)
    }

    return (
      <View>
        <View>
          <TextInput
            autoCapitalize="words"
            autoCorrect={false}
            placeholder="Sök bana eller klubb"
            returnKeyType="search"
            onChangeText={q => this.setSearchQuery(q)}
            value={query}
          />
        </View>

        {previously ? (
          <View
            style={{
              paddingVertical: 20,
              marginHorizontal: 20,
              borderBottomWidth: 2,
              borderBottomColor: '#eee'
            }}>
            <TGText>Vanliga Banor</TGText>
          </View>
        ) : null}

        <FlatList
          removeClippedSubviews={false}
          data={courses}
          renderItem={({ item }) => (
            <ListItem title={item.name} onPress={() => this.selectItem(item)} />
          )}
          keyExtractor={item => `${this.itemType}_${item.id}}`}
          keyboardShouldPersistTaps="always"
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({ items: sortedByName(state.clubs.clubs) })

export default connect(mapStateToProps)(ClubPicker)
