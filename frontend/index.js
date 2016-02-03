import React from 'react'
import { Router, Route, Link } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory';
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import reducer from './reducers'

import App from './components/App'
import LandingPage from './components/public/LandingPage'
import ViewUser from './components/public/ViewUser'

const history = createBrowserHistory()
const logger = createLogger()

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  logger,
)(createStore)

const store = createStoreWithMiddleware(reducer)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}/>
      <Route path="/:nickname" component={ViewUser}/>
      <Route path="/:nickname/:itemId" component={ViewUser}/>
    </Router>
  </Provider>,
  document.getElementById('root')
)
