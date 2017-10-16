import { connect } from 'react-redux'

import { sortedByName } from 'utils'
import { fetchClubsIfNeeded } from 'actions/clubs'
import Listing from 'lists/Listing'
import navOptions from './navigationOptions'

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
}

const mapStateToProps = state => ({ items: sortedByName(state.clubs.clubs) })

export default connect(mapStateToProps)(ClubPicker)
