import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as cookie from 'js-cookie'

import LandingPage from './public/LandingPage'
import AdminPanel from './admin/AdminPanel'
import ArchivePanel from './admin/ArchivePanel'
import PaymentsPanel from './admin/PaymentsPanel'

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
      const query = this.props.location.query
      if (query.itemId) {
        return <PaymentsPanel itemId={this.props.location.query.itemId}/>
      }
      if (query.archive) {
        return <ArchivePanel/>
      } else {
        return <AdminPanel/>
      }
    }
    else {
      // don't render landing page before login
      if (this.props.isFetching) return <div/>
      else return <LandingPage/>
    }
  }
}

function mapStateToProps(state) {
  return state.user
}

export default connect(mapStateToProps)(App)
