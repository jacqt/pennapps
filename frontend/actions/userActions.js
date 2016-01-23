import {
  REQUEST_SIGNUP,
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  LOGOUT
} from '../constants/actionTypes.js'
import * as ajax from '../lib/ajax.js'

function requestLogin() {
  return {
    type: REQUEST_LOGIN
  }
}
function receiveLogin(data) {
  return {
    type: REQUEST_LOGIN,
    data,
  }
}

export function login(email, password) {
  return dispatch => {
    dispatch(requestLogin())
    return ajax.login(email, password)
      .then(res => dispatch(receiveLogin(res.data)))
      .catch(console.log)
  }
}

export function logout() {
  return (dispatch, getState) => {
    const { user } = getState()
    dispatch({ type: LOGOUT })
    return ajax.logout(user.email, user.authToken)
      .catch(console.log)
  }
}
