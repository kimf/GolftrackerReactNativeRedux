import { connect } from 'react-redux'
import Listing from 'lists/Listing'
import { getClub } from 'selectors'
import { sortedByName } from 'utils'
import navOptions from './navigationOptions'

class CoursePicker extends Listing {
  itemType = 'course'
  nextStep = 'SlopePicker'

  static navigationOptions = {
    ...navOptions,
    title: 'Välj bana'
  }
}


const mapStateToProps = state => ({ items: sortedByName(getClub(state).courses) })

export default connect(mapStateToProps)(CoursePicker)
