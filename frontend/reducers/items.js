import { REQUEST_ITEMS, RECEIVE_ITEMS } from '../constants/actionTypes'

const defaultItemsState = {
  isFetching: false,
  user: null,
};

export default function items(state = defaultItemsState, action) {
  switch (action.type) {
    case REQUEST_ITEMS:
      return state + 1
    case RECEIVE_ITEMS:
      return state - 1
    default:
      return state
  }
}
