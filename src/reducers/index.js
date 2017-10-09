import { combineReducers } from 'redux'

// import holes    from './holes';
// import storage  from './storage';
// import nav      from './navigation';
import scorecards from './scorecards'
import clubs from './clubs'
import play from './play'

const rootReducer = combineReducers({
  scorecards,
  clubs,
  play
})

export default rootReducer
