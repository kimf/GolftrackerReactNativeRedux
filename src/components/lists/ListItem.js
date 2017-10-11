import React from 'react'
import { func, string } from 'prop-types'

import TGText from 'shared/TGText'
import TouchableView from 'shared/TouchableView'
import styles from 'styles'

const ListItem = ({ onPress, title }) => (
  <TouchableView
    key={`course_row_${title}`}
    onPress={onPress}
    style={[styles.listrow]}
  >
    <TGText style={{ flex: 1, fontWeight: 'bold' }}>
      {title}
    </TGText>
  </TouchableView>
)

ListItem.propTypes = {
  onPress: func.isRequired,
  title: string.isRequired
}

export default ListItem
