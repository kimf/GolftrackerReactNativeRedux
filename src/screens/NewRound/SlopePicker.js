import { connect } from 'react-redux'

import Listing from 'lists/Listing'
import { getCourse } from 'selectors'
import { sortedByName } from 'utils'
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

const mapStateToProps = state => ({ items: sortedByName(getCourse(state).slopes) })

export default connect(mapStateToProps)(SlopePicker)
