import { UPDATE_LOCATION } from 'redux-simple-router'

export default function route(state = {}, action) {
  switch(action.type) {
  case UPDATE_LOCATION:
    console.log('change route: ', action)
  }
  return state;
}
