import { connect } from 'react-redux'

import { sorted } from 'utils'
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

const mapStateToProps = state => ({
  items: state.clubs.clubs.sort((a, b) => a.name.localeCompare(b.name, 'sv-SE'))
})

export default connect(mapStateToProps)(ClubPicker)
