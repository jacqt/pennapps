import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import * as Actions from '../actions/actions'


class DashboardActions extends Component {
  render() {
    const { dispatch } = this.props

    const me = this.props.me
    return (
      <div className='dashboard-actions'>
        <Link to={`/${me.nickname}`}>View Page</Link><br/>
      	Withdraw Funds<br/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps)(DashboardActions)
