import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as Actions from '../actions/actions'


class DashboardActions extends Component {
  render() {
    const { dispatch } = this.props

    const me = this.props.me
    return (
      <div className='dashboard-actions'>
      	<a href={'/'+me.nickname}>View Page</a><br/>
      	Withdraw Funds<br/>
      	Change Nickname<br/>
      	Change Name<br/>
      	<a href='#' onClick={() => dispatch(Actions.logout())}>Log Out</a>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps)(DashboardActions)
