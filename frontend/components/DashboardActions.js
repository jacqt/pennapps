import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as A from '../actions/actions'


class DashboardActions extends Component {
  render() {
    return (
      <div className='dashboard-actions'>
      	Withdraw Funds<br/>
      	Change Password<br/>
      	Change Nickname<br/>
      	Change Name<br/>
      	<span onClick={() => this.props.dispatch(A.logout())}>Log Out</span>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(DashboardActions)