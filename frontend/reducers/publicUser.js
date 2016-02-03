import {
  REQUEST_USER,
  RECEIVE_USER,
} from '../constants/actionTypes'

import { getUserFromData } from '../lib/utils'

const defaultUserState = {
  isFetching: false,
  user: null,
}

function combine(data) {
  return Object.assign(data.society, {
    items: data.items
  })
}

export default function user(state = defaultUserState, action) {
  switch (action.type) {
    case REQUEST_USER:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_USER:
      const user = getUserFromData(action.res.data)
      return Object.assign({}, state, {
        isFetching: false,
        user,
      })
    default:
      return state
  }
}
