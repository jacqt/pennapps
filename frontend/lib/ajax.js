import { API_BASE } from 'urls'

import * as fetch from 'fetch'
import * as url from 'url'

export function login(email, password) {
  const requestUrl =  url.format({
    pathname: API_BASE + '/login',
    query: {
      email,
      password,
    }
  })
  return(processResponse(
    fetch(requestUrl)
  ))
}

export function logout(email, authToken) {
  const requestUrl =  url.format({
    pathname: API_BASE + '/logout',
    query: {
      email,
      authToken,
    }
  })
  return(processResponse(
    fetch(requestUrl)
  ))
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    throw new Error(response.status)
  }
}
function parseJson(response) {
  return response.json()
}
function processResponse(promise) {
  return promise.then(checkStatus).then(parseJson)
}
