import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as cookie from 'js-cookie'

import LandingPage from './public/LandingPage'
import AdminPanel from './admin/AdminPanel'

import * as Actions from '../actions/userActions'

class App extends Component {
  componentWillMount() {
    const { dispatch } = this.props

    const email = cookie.get('email')
    const authToken = cookie.get('auth_token')
    if (email && authToken) {
      console.log('logged in already')
      dispatch(Actions.reLogin(email, authToken))
    }
  }
  render() {
    const me = this.props.user

    if (me) {
      return <AdminPanel route={this.props.location.query}/>
    }
    else if (this.props.isFetching) {
      return <div/> // don't render landing page before login
    }
    else {
      console.log(this.props.location)
      return <LandingPage referer={this.props.location.query.ref}/>
    }
  }
}

function mapStateToProps(state) {
  return state.user
}

export default connect(mapStateToProps)(App)
