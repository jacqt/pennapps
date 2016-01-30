import React from 'react'
import { Router, Route, Link } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { syncHistory } from 'redux-simple-router'
import thunk from 'redux-thunk'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import reducer from './reducers'

import App from './components/App'
import LandingPage from './components/LandingPage'
import ViewUser from './components/ViewUser'

const history = createBrowserHistory()
const reduxRouterMiddleware = syncHistory(history)

import createLogger from 'redux-logger';
const logger = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  reduxRouterMiddleware,
  logger,
)(createStore)

const store = createStoreWithMiddleware(reducer)

/*if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    const nextReducer = require('./reducers')
    store.replaceReducer(nextReducer)
  })
}*/

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}/>
      <Route path="/:nickname" component={ViewUser}/>
    </Router>
  </Provider>,
  document.getElementById('root')
)
