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

export function requestUser(nickname) {
  return dispatch => {
    dispatch({ type: REQUEST_USER })
    return ajax.requestUser(nickname)
      .then(res => dispatch(receiveUser(res, nickname)))
      .catch(console.log)
  }
}

export function addItem(name, price, capacity) {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({ type: ADD_ITEM })
    return ajax.addItem(state.user.me.email, state.user.me.auth_token, name, price, capacity)
      .then(res => dispatch(requestUser(state.user.me.nickname)))
      .catch(console.log)
  }
}

export function removeItem(id) {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({ type: REMOVE_ITEM })
    return ajax.removeItem(state.user.me.email, state.user.me.auth_token, id)
      .then(res => dispatch(requestUser(state.user.me.nickname)))
      .catch(console.log)
  }
}

export function updateItem(id, name, price, capacity) {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({ type: EDIT_ITEM })
    return ajax.updateItem(state.user.me.email, state.user.me.auth_token, id, name, price, capacity)
      .then(res => dispatch(requestUser(state.user.me.nickname)))
      .catch(console.log)
  }
}

export function archiveItem(id, archived) {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({ type: EDIT_ITEM })
    return ajax.archiveItem(state.user.me.email, state.user.me.auth_token, id, archived)
      .then(res => dispatch(requestUser(state.user.me.nickname)))
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
function receiveUser(res, nickname) {
  return {
    type: RECEIVE_USER,
    res,
    nickname
  }
}
