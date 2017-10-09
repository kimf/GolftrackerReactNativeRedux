const initialState = { loading: false, scorecards: [] }

export default (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_SCORECARDS': {
      return {
        ...state,
        loading: true
      }
    }

    case 'RECEIVE_SCORECARDS': {
      const { scorecards } = action.scorecards
      return {
        ...state,
        receivedAt: action.receivedAt,
        loading: false,
        scorecards
      }
    }

    default:
      return state
  }
}
