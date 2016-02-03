import { combineReducers } from 'redux'

import user from './user'
import publicUser from './publicUser'

const rootReducer = combineReducers({
  user,
  publicUser,
})

export default rootReducer
