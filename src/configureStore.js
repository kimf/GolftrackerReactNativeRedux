import { AsyncStorage } from 'react-native'
import { applyMiddleware, createStore, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk'

import rootReducer from 'reducers'

const configureStore = (onComplete) => {
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const middleware = [thunk]
  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(...middleware),
      autoRehydrate()
    )
  )

  persistStore(store, { storage: AsyncStorage }, onComplete)// .purge()
  return store
}

export default configureStore
