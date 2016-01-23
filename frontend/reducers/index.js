import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'

import route from './route'
import user from './user'
import items from './items'


const rootReducer = combineReducers({
  route,
  user,
  items,
  routing: routeReducer,
})

export default rootReducer
