import { REQUEST_LOGIN, RECEIVE_LOGIN, LOGOUT } from '../constants/actionTypes'

const defaultUserState = {
  isFetching: false,
  user: null,
};

export default function user(state = defaultUserState, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return Object.assign({}, state, {
        isFetching: true,
        user: null,
      })
    case RECEIVE_LOGIN:
      return Object.assign({}, state, {
        isFetching: false,
        user: action.data,
      })
    case LOGOUT:
      return Object.assign({}, state, {
        isFetching: false,
        user: null,
      })
    default:
      return state
  }
}
