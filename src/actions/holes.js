import { API_URL } from 'constants'

export const REQUEST_HOLES = 'REQUEST_HOLES'
function requestHoles() {
  return { type: REQUEST_HOLES }
}

export const RECEIVE_HOLES = 'RECEIVE_HOLES'
function receiveHoles(json) {
  return {
    type: RECEIVE_HOLES,
    holes: json.tees,
    receivedAt: Date.now()
  }
}

function fetchHoles(slopeId) {
  return (dispatch) => {
    dispatch(requestHoles())

    return fetch(`${API_URL}/slopes/${slopeId}.json`)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveHoles(json)))
  }
}

function shouldFetchHoles(state) {
  const holes = state.play.holes.length
  if (state.play.loading) { return false }
  if (holes > 0) { return false }
  return true
}


export function fetchHolesIfNeeded(slopeId) {
  return (dispatch, getState) => {
    if (shouldFetchHoles(getState())) {
      return dispatch(fetchHoles(slopeId))
    }
    return Promise.resolve()
  }
}
