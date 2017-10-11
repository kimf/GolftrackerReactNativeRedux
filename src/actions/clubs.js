import { API_URL } from 'constants'

function requestClubs() {
  return { type: 'REQUEST_CLUBS' }
}

function receiveClubs(json) {
  return { type: 'RECEIVE_CLUBS', clubs: json.clubs }
}


function fetchClubs() {
  return (dispatch) => {
    dispatch(requestClubs())

    return fetch(`${API_URL}/clubs.json`)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveClubs(json)))
  }
}

function shouldFetchClubs(state) {
  if (state.clubs.loading) { return false }
  if (state.clubs.clubs.length > 0) { return false }
  return true
}

// eslint-disable-next-line import/prefer-default-export
export function fetchClubsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchClubs(getState())) {
      return dispatch(fetchClubs())
    }
    return Promise.resolve()
  }
}
