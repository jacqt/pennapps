import {
  REQUEST_SIGNUP,
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  LOGOUT,
  ADD_ITEM,
  EDIT_ITEM,
  REMOVE_ITEM,
} from '../constants/actionTypes'

import { getUserFromData } from '../lib/utils'

import * as cookie from 'js-cookie'

const defaultUserState = {
  isFetching: false,
  user: null,
  error: null,
}

export default function user(state = defaultUserState, action) {
  switch (action.type) {
    case REQUEST_SIGNUP:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
      })
    case REQUEST_LOGIN:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
      })
    case RECEIVE_LOGIN:
      if (action.res.error || action.res.status === 'failure') {
        if (cookie.get('email')) {
          // delete old cookie
          cookie.remove('email')
          cookie.remove('auth_token')
          return Object.assign({}, state, {
            isFetching: false,
            error: null,
          })
        }
        if (action.login) {
          return Object.assign({}, state, {
            isFetching: false,
            user: null,
            error: { type: 'login' }
          })
        }
        else { // action.signup === true
          return Object.assign({}, state, {
            isFetching: false,
            user: null,
            error: { type: 'signup' }
          })
        }
      }
      const user = getUserFromData(action.res.data)
      cookie.set('email', user.email)
      cookie.set('auth_token', user.auth_token)
      return Object.assign({}, state, {
        isFetching: false,
        user,
      })
    case LOGOUT:
      cookie.remove('email')
      cookie.remove('auth_token')
      return Object.assign({}, state, {
        isFetching: false,
        user: null,
        error: null,
      })
    default:
      return state
  }
}
