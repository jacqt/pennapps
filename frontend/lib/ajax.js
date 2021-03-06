import { API_BASE } from './urls'

import * as url from 'url'

function objectToFormData(obj, form, namespace) {
  const fd = form || new FormData()
  let formKey

  for(const property in obj) {
    if(obj.hasOwnProperty(property)) {
      if(namespace) {
        formKey = namespace + '[' + property + ']'
      } else {
        formKey = property
      }

      if(typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
        objectToFormData(obj[property], fd, property)
      } else {
        fd.append(formKey, obj[property])
      }
    }
  }
  return fd;
}

export function signup(email, password, passwordConfirmation, name, nickname) {
  const f = objectToFormData({
    society: {
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
      name: name,
      nickname: nickname,
    }
  })

  const requestUrl = API_BASE + '/auth/sign_up/'

  return processResponse(fetch(requestUrl, {
    method: 'post',
    body: f,
  }))
}

export function facebookCreateOrLogin(facebook_token) {
  const f = new FormData();
  f.append('facebook_token', encodeURIComponent(facebook_token));
  const requestUrl = API_BASE + '/auth/login/'
  return processResponse(fetch(requestUrl, {
    method: 'post',
    body: f,
  }));
}

export function login(email, password) {
  const f = new FormData()
  f.append('email', email)
  f.append('password', password)

  const requestUrl = API_BASE + '/auth/login/'

  return processResponse(fetch(requestUrl, {
    method: 'post',
    body: f,
  }))
}
export function reLogin(email, authToken) {
  const f = new FormData()
  f.append('email', email)
  f.append('authentication_token', authToken)

  const requestUrl = API_BASE + '/auth/login_with_token/'

  return processResponse(fetch(requestUrl, {
    method: 'post',
    body: f,
  }))
}

export function requestUser(nickname) {
  const requestUrl =  url.format({
    pathname: API_BASE + '/society/',
    query: {
      nickname: nickname,
    }
  })
  return processResponse(fetch(requestUrl))
}

export function updateUser(email, authToken, nickname, delta) {
  const f = objectToFormData({
    email,
    authentication_token: authToken,
    society: delta,
  })

  const requestUrl = API_BASE + '/society/?nickname=' + nickname

  return processResponse(fetch(requestUrl, {
    method: 'post',
    body: f,
  }))
}

export function addItem(email, authToken, name, price, capacity) {
  const f = objectToFormData({
    email,
    authentication_token: authToken,
    item: {
      name,
      price,
      capacity,
    }
  })

  const requestUrl = API_BASE + '/items/'

  return processResponse(fetch(requestUrl, {
    method: 'post',
    body: f,
  }))
}

export function removeItem(email, authToken, id) {
  const f = new FormData()
  f.append('email', email)
  f.append('authentication_token', authToken)

  const requestUrl = API_BASE + '/items/' + id

  return processResponse(fetch(requestUrl, {
    method: 'delete',
    body: f,
  }))
}

export function updateItem(email, authToken, id, name, price, capacity) {
  const f = objectToFormData({
    email,
    authentication_token: authToken,
    item: {
      name,
      price,
      capacity,
    }
  })

  const requestUrl = API_BASE + '/items/' + id

  return processResponse(fetch(requestUrl, {
    method: 'post',
    body: f,
  }))
}

export function archiveItem(email, authToken, id, archived) {
  const f = objectToFormData({
    email,
    authentication_token: authToken,
    item: {
      archived
    }
  })

  const requestUrl = API_BASE + '/items/' + id

  return processResponse(fetch(requestUrl, {
    method: 'post',
    body: f,
  }))
}

export function getClientToken() {
  const requestUrl = API_BASE + '/client_token/'

  return processResponse(fetch(requestUrl))
}

export function pay(email, itemId, stripeToken) {
  const f = objectToFormData({
    payment: {
      email: email,
    },
    id: itemId,
    stripeToken: stripeToken,
  })

  const requestUrl = API_BASE + '/payments/'

  return processResponse(fetch(requestUrl, {
    method: 'post',
    body: f,
  }))
}

export function withdraw(email, authToken) {
  const f = objectToFormData({
    email,
    authentication_token: authToken,
  })

  const requestUrl = API_BASE + '/request_withdrawal/'

  return processResponse(fetch(requestUrl, {
    method: 'post',
    body: f,
  }))
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
  return promise/*.then(checkStatus)*/.then(parseJson)
}
