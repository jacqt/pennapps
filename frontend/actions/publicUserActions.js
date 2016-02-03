import {
  REQUEST_USER,
  RECEIVE_USER,
} from '../constants/actionTypes.js'

import * as ajax from '../lib/ajax.js'

export function requestUser(nickname) {
  return dispatch => {
    dispatch({ type: REQUEST_USER })
    return ajax.requestUser(nickname)
      .then(res => dispatch(receiveUser(res)))
      .catch(console.log)
  }
}


/* action helpers */
function receiveUser(res) {
  return {
    type: RECEIVE_USER,
    res,
  }
}
