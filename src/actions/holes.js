import { API_URL } from 'appConstants'

export const REQUEST_HOLES = 'REQUEST_HOLES'
function requestHoles() {
  return { type: REQUEST_HOLES }
}

export const RECEIVE_HOLES = 'RECEIVE_HOLES'
function receiveHoles(holes) {
  return {
    type: RECEIVE_HOLES,
    receivedAt: Date.now(),
    holes
  }
}

function fetchHoles(courseId) {
  return dispatch => {
    dispatch(requestHoles())

    return fetch(`${API_URL}/courses/${courseId}/holes.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveHoles(json)))
  }
}

function shouldFetchHoles(state) {
  return true
  // const holes = state.play.holes.length
  // if (state.play.loading) {
  //   return false
  // }
  // if (holes > 0) {
  //   return false
  // }
  // return true
}

export function fetchHolesIfNeeded(courseId) {
  return (dispatch, getState) => {
    if (shouldFetchHoles(getState())) {
      return dispatch(fetchHoles(courseId))
    }
    return Promise.resolve()
  }
}
