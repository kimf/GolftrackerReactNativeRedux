import fetch from 'isomorphic-fetch'

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
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestHoles())

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.
    return fetch(`${API_URL  }/slopes/${  slopeId  }.json`)
      .then(response => response.json())
      .then(json =>

        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(receiveHoles(json)))

    // In a real world app, you also want to
    // catch any error in the network call.
  }
}

function shouldFetchHoles(state) {
  const holes = state.play.holes.length
  if (holes === 0) {
    return true
  } else if (state.play.loading) {
    return false
  }
}


export function fetchHolesIfNeeded(slopeId) {
  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.

  // This is useful for avoiding a network request if
  // a cached value is already available.

  return (dispatch, getState) => {
    if (shouldFetchHoles(getState())) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchHoles(slopeId))
    } 
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    
  }
}
