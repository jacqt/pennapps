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
      .then(res => dispatch(receiveLogin(res)))
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
export function logout(email, password) {
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

export function addItem(email, authToken, name, price, capacity, nickname) {
  return dispatch => {
    dispatch({ type: ADD_ITEM })
    return ajax.addItem(email, authToken, name, price, capacity)
      .then(res => dispatch(requestUser(nickname)))
      .catch(console.log)
  }
}

export function removeItem(email, authToken, id, nickname) {
  return dispatch => {
    dispatch({ type: REMOVE_ITEM })
    return ajax.removeItem(email, authToken, id)
      .then(res => dispatch(requestUser(nickname)))
      .catch(console.log)
  }
}

export function updateItem(email, authToken, id, name, price, capacity, nickname) {
  return dispatch => {
    dispatch({ type: REMOVE_ITEM })
    return ajax.updateItem(email, authToken, id, name, price, capacity)
      .then(res => dispatch(requestUser(nickname)))
      .catch(console.log)
  }
}

/* action helpers */
function receiveLogin(res) {
  return {
    type: RECEIVE_LOGIN,
    res,
  }
}
function receiveUser(res, nickname) {
  return {
    type: RECEIVE_USER,
    res,
    nickname
  }
}
