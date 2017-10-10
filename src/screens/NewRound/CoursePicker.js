import { connect } from 'react-redux'
import Listing from 'lists/Listing'
import { getClub } from 'selectors'
import navOptions from './navigationOptions'

class CoursePicker extends Listing {
  itemType = 'course'
  nextStep = 'SlopePicker'

  static navigationOptions = {
    ...navOptions,
    title: 'Välj bana'
  }
}


const mapStateToProps = state => ({
  items: getClub(state).courses.sort((a, b) => a.name.localeCompare(b.name, 'sv-SE'))
})

export default connect(mapStateToProps)(CoursePicker)
