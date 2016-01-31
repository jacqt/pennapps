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

function combine(data) {
  return Object.assign(data.society, {
    items: data.items
  })
}

export default function user(state = defaultUserState, action) {
  switch (action.type) {
    case REQUEST_SIGNUP:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case REQUEST_LOGIN:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_LOGIN:
      if (action.res.error || action.res.status === 'failure') {
        if (cookie.get('email')) {
          // delete old cookie
          cookie.remove('email')
          cookie.remove('auth_token')
          return Object.assign({}, state, {
            isFetching: false,
          })
        }
        if (action.login) {
          return Object.assign({}, state, {
            isFetching: false,
            me: {login_error: true},
          })
        }
        else { // action.signup === true
          return Object.assign({}, state, {
            isFetching: false,
            me: {signup_error: true},
          })
        }
      }
      const user = combine(action.res.data)
      cookie.set('email', user.email)
      cookie.set('auth_token', user.auth_token)
      return Object.assign({}, state, {
        isFetching: false,
        me: user,
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
      const isMe = state.me && state.me.nickname === action.nickname
      if (isMe) {
        if (action.res.error) {
          return Object.assign({}, state, {
            isFetching: false,
            me: {error: true},
          })
        }
        const user = combine(action.res.data)
        return Object.assign({}, state, {
          isFetching: false,
          me: user,
        })
      }
      else {
        if (action.res.error) {
          return Object.assign({}, state, {
            isFetching: false,
            watching: {error: true},
          })
        }
        const user = combine(action.res.data)
        return Object.assign({}, state, {
          isFetching: false,
          watching: user,
        })
      }
    default:
      return state
  }
}
