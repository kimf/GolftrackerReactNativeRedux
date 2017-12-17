import React from 'react'
import { arrayOf, shape, func } from 'prop-types'

const WebList = ({ data, renderItem, keyExtractor, style }) =>
  data && data.length > 0 ? (
    <ul className="list" style={style}>
      {data.map(item => <li key={keyExtractor(item)}>{renderItem({ item })}</li>)}
    </ul>
  ) : null

WebList.propTypes = {
  data: arrayOf(shape()).isRequired,
  renderItem: func.isRequired,
  keyExtractor: func.isRequired,
  style: shape()
}

WebList.defaultProps = { style: {} }

export default WebList
