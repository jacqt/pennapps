import React, { Component, PropTypes } from 'react'
import { routeActions } from 'redux-simple-router'
import { connect } from 'react-redux'
import * as cookie from 'js-cookie'

import Header from './Header'
import DashboardItem from './DashboardItem'
import DashboardActions from './DashboardActions'
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
    const me = this.props.user.me
    console.log(me)
    if (me) {
    return (
      <div>
        <Header></Header>
        <div className='ui container'>
          <div className='ui two column stackable grid bottom aligned'>
            <div className='twelve wide column left aligned'>
              <div className='dashboard-name'>{me.name}</div>
            </div>
            <div className='four wide column right aligned'>
              <h2>Balance</h2>
              <div className='dashboard-balance'>£315.00</div>
            </div>
          </div>
          <hr/>
          <div className='ui two column stackable grid'>
            <div className='twelve wide column left aligned'>
              <h1>Your Items</h1>
              <DashboardItem name='Teddy Hall Formal' price='13.00' remaining='12' capacity='25'/>
              <DashboardItem name='Teddy Hall Formal' price='13.00' remaining='12' capacity='25'/>
              <DashboardItem name='Teddy Hall Formal' price='13.00' remaining='12' capacity='25'/>  
            </div>
            <div className='four wide column right aligned'>
              <h1>Actions</h1>
              <DashboardActions/>
            </div>
          </div>
        </div>
        <p>
      <button onClick={() => this.add()}>landing</button>
      <button onClick={() => this.props.dispatch(A.requestUser('sasdsdsasadsdsa'))}>req</button>
      <button onClick={() => dispatch(A.logout())}>Logout</button>
      </p>
      </div>
      )
    } else {
      return(
        <LandingPage/>
        )
    }
  }
  add() {
    const me = this.props.user.me
    this.props.dispatch(A.addItem(me.email, me.auth_token, 'test', 10.0, 100, me.nickname))
  }
  isLoggedIn() {
    const me = this.props.user.me
    return me.email
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App)
