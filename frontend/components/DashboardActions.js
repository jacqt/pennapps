import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { withdraw } from '../lib/ajax'

class DashboardActions extends Component {
  render() {
    const me = this.props.me
    return (
      <div className='dashboard-actions'>
        <Link to={`/${me.nickname}`}>View Page</Link><br/>
        {this.props.from === 'admin' ? <Link to={'/'} query={ {archive: true} }>Archived Items</Link> : <Link to={'/'}>Your Items</Link>} <br/>
      	<a href='#' onClick={() => this.withdraw()}>Withdraw Funds</a><br/>
      </div>
    )
  }

  withdraw() {
    const me = this.props.user
    withdraw(me.email, me.auth_token)
    .then(res => {
      console.log(res) // TODO(Taimur)
    })
    .catch(console.log)
  }
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps)(DashboardActions)
