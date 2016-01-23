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

const history = createBrowserHistory()
const reduxRouterMiddleware = syncHistory(history)

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  reduxRouterMiddleware,
)(createStore)

const store = createStoreWithMiddleware(reducer)

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    const nextReducer = require('./reducers')
    store.replaceReducer(nextReducer)
  })
}

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}/>
      <Route path="/hi" component={LandingPage}/>
    </Router>
  </Provider>,
  document.getElementById('root')
)
