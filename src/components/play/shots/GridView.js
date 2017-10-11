import React from 'react'
import { View } from 'react-native'
import { arrayOf, func, string } from 'prop-types'

import TGText from 'shared/TGText'
import styles, { colors } from 'styles'

const GridView = ({ title, strong, items, onPress }) => (
  <View style={styles.container}>
    <TGText style={styles.gridTitle}>
      <TGText>{title}</TGText>
      {strong ? <TGText style={{ fontWeight: 'bold', color: colors.dark }}>{strong}</TGText> : null}
    </TGText>
    <View style={styles.gridView}>
      {items.map(item => (
        <TGText
          viewStyle={styles.gridButton}
          style={styles.gridButtonText}
          key={item}
          onPress={() => onPress(item)}
        >
          {item}
        </TGText>
      ))}
    </View>
  </View>
)

GridView.propTypes = {
  title: string.isRequired,
  strong: string,
  items: arrayOf(string).isRequired,
  onPress: func.isRequired
}

GridView.defaultProps = { strong: null }

export default GridView
