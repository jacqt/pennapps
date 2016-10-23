import React from 'react'
import { Router, Route, Link } from 'react-router'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import { PREFIX } from './lib/urls'
import reducer from './reducers'
import history from './history'

import App from './components/App'
import LandingPage from './components/public/LandingPage'
import ViewUser from './components/public/ViewUser'

const logger = createLogger()

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  logger,
)(createStore)

const store = createStoreWithMiddleware(reducer)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path={PREFIX + "/"} component={App}/>
      <Route path={PREFIX + "/:nickname"} component={ViewUser}/>
      <Route path={PREFIX + "/:nickname/:itemId"} component={ViewUser}/>
    </Router>
  </Provider>,
  document.getElementById('root')
)
