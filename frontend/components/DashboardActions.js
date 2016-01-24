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
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps)(DashboardActions)
