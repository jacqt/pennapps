import {
  REQUEST_SIGNUP,
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  LOGOUT,
  ADD_ITEM,
  EDIT_ITEM,
  REMOVE_ITEM,
} from '../constants/actionTypes.js'

import * as ajax from '../lib/ajax.js'

export function signup(email, password, passwordConfirmation, name, nickName) {
  return dispatch => {
    dispatch({ type: REQUEST_SIGNUP })
    return ajax.signup(email, password, passwordConfirmation, name, nickName)
      .then(res => dispatch(receiveSignup(res)))
      .catch(console.log)
  }
}

export function login(email, password) {
  return dispatch => {
    dispatch({ type: REQUEST_LOGIN })
    return ajax.login(email, password)
      .then(res => dispatch(receiveLogin(res)))
      .catch(console.log)
  }
}
export function logout() {
  return { type: LOGOUT }
}
export function reLogin(email, authToken) {
  return dispatch => {
    dispatch({ type: REQUEST_LOGIN })
    return ajax.reLogin(email, authToken)
      .then(res => dispatch(receiveLogin(res)))
      .catch(console.log)
  }
}

export function addItem(name, price, capacity) {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({ type: ADD_ITEM })
    const email = state.user.me.email
    const authToken = state.user.me.auth_token
    return ajax.addItem(email, authToken, name, price, capacity)
      .then(res => dispatch(reLogin(email, authToken)))
      .catch(console.log)
  }
}

export function removeItem(id) {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({ type: REMOVE_ITEM })
    const email = state.user.me.email
    const authToken = state.user.me.auth_token
    return ajax.removeItem(email, authToken, id)
      .then(res => dispatch(reLogin(email, authToken)))
      .catch(console.log)
  }
}

export function updateItem(id, name, price, capacity) {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({ type: EDIT_ITEM })
    const email = state.user.me.email
    const authToken = state.user.me.auth_token
    return ajax.updateItem(email, authToken, id, name, price, capacity)
      .then(res => dispatch(reLogin(email, authToken)))
      .catch(console.log)
  }
}

export function archiveItem(id, archived) {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({ type: EDIT_ITEM })
    const email = state.user.me.email
    const authToken = state.user.me.auth_token
    return ajax.archiveItem(email, authToken, id, archived)
      .then(res => dispatch(reLogin(email, authToken)))
      .catch(console.log)
  }
}

/* action helpers */
function receiveLogin(res) {
  return {
    type: RECEIVE_LOGIN,
    res,
    login: true,
  }
}
function receiveSignup(res) {
  return {
    type: RECEIVE_LOGIN,
    res,
    signup: true,
  }
}
