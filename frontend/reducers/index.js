import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'

import route from './route'
import user from './user'

const rootReducer = combineReducers({
  route,
  user,
  routing: routeReducer,
})

export default rootReducer
