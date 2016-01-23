import {
  REQUEST_SIGNUP,
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  LOGOUT,
  REQUEST_USER,
  RECEIVE_USER,
  ADD_ITEM,
  EDIT_ITEM,
  REMOVE_ITEM,
} from '../constants/actionTypes'

import * as cookie from 'js-cookie'

const defaultUserState = {
  isFetching: false,
  me: null,
  watching: null,
};

export default function user(state = defaultUserState, action) {
  switch (action.type) {
    case REQUEST_SIGNUP:
      return Object.assign({}, state, {
        isFetching: true,
        me: null,
      })
    case REQUEST_LOGIN:
      return Object.assign({}, state, {
        isFetching: true,
        me: null,
      })
    case RECEIVE_LOGIN:
      cookie.set('email', action.user.email)
      cookie.set('auth_token', action.user.auth_token)
      return Object.assign({}, state, {
        isFetching: false,
        me: action.user,
      })
    case LOGOUT:
      cookie.remove('email')
      cookie.remove('auth_token')
      return Object.assign({}, state, {
        isFetching: false,
        me: null,
      })
    case REQUEST_USER:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_USER:
      const newMe = (state.user.me.id === action.user.id) ? action.user : state.user.me
      const newWatching = (state.user.watching.id === action.user.id) ? action.user : state.user.watching
      return Object.assign({}, state, {
        isFetching: false,
        me: newMe,
        watching: newWatching,
      })
    default:
      return state
  }
}
