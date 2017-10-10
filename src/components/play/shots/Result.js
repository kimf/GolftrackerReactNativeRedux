import React from 'react'
import { View, Button } from 'react-native'
import { number, func } from 'prop-types'

import TGText from 'shared/TGText'
import { GREEN_RESULTS, FAIRWAY_RESULTS } from 'constants'

const Result = ({ par, addResult }) => {
  const results = par === 3 ? GREEN_RESULTS : FAIRWAY_RESULTS
  return (
    <View>
      <TGText>WHAT WAS THE RESULT?</TGText>
      {results.map(result =>
        <Button onPress={() => addResult(result)}>{result}</Button>)}
    </View>
  )
}

Result.propTypes = {
  par: number.isRequired,
  addResult: func.isRequired
}

export default Result
