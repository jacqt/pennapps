import React, { Component, PropTypes } from 'react'
import { routeActions } from 'redux-simple-router'
import { connect } from 'react-redux'
import * as cookie from 'js-cookie'

import LandingPage from './LandingPage'

import * as A from '../actions/actions'

class App extends Component {
  componentDidMount() {
    const email = cookie.get('email')
    const authToken = cookie.get('auth_token')
    if (email && authToken) {
      console.log('logged in already')
      this.props.dispatch(A.reLogin(email, authToken))
    }
    else {
      this.props.dispatch(A.login('lukdsasasdadsddsdsssasadaddsasaddsdsasasas@de24.de', '123'))
    }
  }
  render() {
    const { dispatch } = this.props
    return (
      <p>
      <button onClick={() => this.add()}>landing</button>
      <button onClick={() => this.props.dispatch(A.requestUser('sasdsdsasadsdsa'))}>req</button>
      </p>
    )
  }
  add() {
    const me = this.props.user.me
    this.props.dispatch(A.addItem(me.email, me.auth_token, 'test', 10.0, 100, me.nickname))
  }
  isLoggedIn() {
    const me = this.props.user.me
    return me !== null
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App)
