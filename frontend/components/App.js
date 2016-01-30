import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as cookie from 'js-cookie'

import AdminPanel from './AdminPanel'
import LandingPage from './LandingPage'

import * as Actions from '../actions/actions'

class App extends Component {
  componentWillMount() {
    const { dispatch } = this.props

    const email = cookie.get('email')
    const authToken = cookie.get('auth_token')
    if (email && authToken) {
      console.log('logged in already')
      dispatch(Actions.reLogin(email, authToken))
    }
    else {
      dispatch(Actions.login('lukdsasasdadsddsdsssasadaddsasaddsdsasasas@de24.de', '123'))
    }
  }
  render() {
    // don't render landing page before login
    if (this.props.isFetching && this.props.me === null) return <div/>

    const me = this.props.me
    if (me && !me.error) {
      return <AdminPanel/>
    }
    else {
      return <LandingPage/>
    }
  }
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps)(App)
