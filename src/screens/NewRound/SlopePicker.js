import { connect } from 'react-redux'
import Listing from 'lists/Listing'
import { getCourse } from 'selectors'
import navOptions from './navigationOptions'

class SlopePicker extends Listing {
  itemType = 'slope'
  nextStep = 'Play'
  resetNavigationOnNextStep = true

  static navigationOptions = {
    ...navOptions,
    title: 'Välj tee'
  }
}

const mapStateToProps = state => ({
  items: getCourse(state).slopes.sort((a, b) => a.name.localeCompare(b.name, 'sv-SE'))
})

export default connect(mapStateToProps)(SlopePicker)
