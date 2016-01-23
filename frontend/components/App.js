import React, { Component, PropTypes } from 'react'
import { routeActions } from 'redux-simple-router'
import { connect } from 'react-redux'

import LandingPage from './LandingPage'


class App extends Component {
  render() {
    const { dispatch } = this.props
    return (
      <p>
      <button onClick={() => this.props.dispatch(routeActions.push('/hi'))}>landing</button>
      </p>
    )
  }
}

export default connect()(App)
