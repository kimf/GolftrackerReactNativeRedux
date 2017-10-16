const initialState = {
  loading: false,
  clubs: []
}

export default function clubsReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_CLUBS':
      return { ...state, loading: true }

    case 'RECEIVE_CLUBS': {
      return {
        ...state,
        clubs: action.clubs,
        loading: false,
        receivedAt: action.receivedAt
      }
    }

    default:
      return state
  }
}
