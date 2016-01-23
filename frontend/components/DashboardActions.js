import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as A from '../actions/actions'


class DashboardActions extends Component {
  render() {
    return (
      <div className='dashboard-actions'>
      	<a href={'/'+this.props.user.me.nickname+''}>View Page</a><br/>
      	Withdraw Funds<br/>
      	Change Nickname<br/>
      	Change Name<br/>
      	<a href='#' onClick={() => this.props.dispatch(A.logout())}>Log Out</a>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(DashboardActions)