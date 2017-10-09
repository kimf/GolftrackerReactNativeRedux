import React from 'react'
import { View } from 'react-native'
import { string, number, shape, func } from 'prop-types'

import TGText from 'shared/TGText'
import TouchableView from 'shared/TouchableView'
import styles, { colors } from 'styles'

const CourseRow = ({ course, selectCourse }) => (
  <TouchableView
    key={`course_row_${course.id}`}
    style={styles.courserow}
    onPress={() => selectCourse(course)}
  >
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <TGText style={{ flex: 4, fontWeight: 'bold' }}>
          {course.name}
        </TGText>
        <TGText style={{ flex: 1, fontSize: 14, color: colors.muted }}>
          PAR {course.par}
        </TGText>
        <TGText style={{ flex: 1, fontSize: 14, color: colors.muted }}>
          {course.holes.count} HÅL
        </TGText>
      </View>
      <View style={{ flex: 1 }}>
        <TGText style={{ color: colors.muted, marginTop: 10 }}>
          {course.club}
        </TGText>
      </View>
    </View>
  </TouchableView>
)

CourseRow.propTypes = {
  course: shape({
    id: string.isRequired,
    club: string.isRequired,
    name: string.isRequired,
    par: number.isRequired,
    holes: shape({
      count: number.isRequired
    }).isRequired
  }).isRequired,
  selectCourse: func.isRequired
}

export default CourseRow
