import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class DashboardActions extends Component {
  render() {
    const me = this.props.user
    return (
      <div className='dashboard-actions'>
        <Link to={`/${me.nickname}`} target="_blank">View Page</Link><br/>
        {this.props.from === 'admin' ? <Link to={'/'} query={ {archive: true} }>Archived Items</Link>:<Link to={'/'}>Your Items</Link>}<br/>
        <Link to={'/'} query={ {withdraw: true} }>Withdraw Funds</Link><br/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps)(DashboardActions)
