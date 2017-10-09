import { AsyncStorage } from 'react-native'
import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk'

import scorecards from 'reducers/scorecards'

const configureStore = (onComplete) => {
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const middleware = [thunk]
  const reducers = combineReducers({ scorecards })
  const store = createStore(
    reducers,
    composeEnhancers(
      applyMiddleware(...middleware),
      autoRehydrate()
    )
  )

  persistStore(store, { storage: AsyncStorage }, onComplete).purge() // .purge()
  return store
}

export default configureStore
