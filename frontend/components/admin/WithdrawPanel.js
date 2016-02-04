import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as _ from 'underscore'

import Header from './Header'
import DashboardActions from './DashboardActions'

import * as Actions from '../../actions/userActions'

class ArchivePanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    const me = this.props.user
    return (
      <div>
        <Header/>
        <div className='ui container'>
          <div className='ui two column stackable grid bottom aligned'>
            <div className='twelve wide column left aligned'>
              <div className='dashboard-name'>{me.name}</div>
            </div>
            <div className='four wide column right aligned'>
              <h2>Balance</h2>
              <div className='dashboard-balance'>{me.balance.balance_formatted}</div>
            </div>
          </div>
          <hr/>
          <div className='ui two column stackable grid'>
            <div className='six wide column left aligned'>
              <h1>Withdraw Funds</h1>
              <p>Almost there! Just enter your bank account number and sort code, then click below. Your funds should
              arrive in 1-2 days.</p>
              <form className="ui form">
              <div className="field">
                <input type="text" name="account-number" placeholder="Account Number"/>
              </div>
              <div className="field">
                <input type="text" name="sort-code" placeholder="Sort Code"/>
              </div>
              <button className="ui button" onClick={() => withdraw()}>Withdraw Funds</button>
            </form>
            </div>
            <div className='ten wide column right aligned'>
              <h1>Actions</h1>
              <DashboardActions from='admin'/>
            </div>
          </div>
        </div>
      </div>
    )
  }
  withdraw() {
    // TODO(Taimur): get bank details
    const me = this.props.user
    withdraw(me.email, me.auth_token)
    .then(res => {
      console.log(res) // TODO(Taimur): show success
    })
    .catch(console.log)
  }
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps)(ArchivePanel)
