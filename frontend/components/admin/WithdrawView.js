import React, { Component } from 'react'
import linkState from 'react-link-state'
import { connect } from 'react-redux'
import * as _ from 'underscore'

import * as Actions from '../../actions/userActions'

class WithdrawPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accountNumber: '',
      sortCode: '',
    }
  }
  render() {
    return (
      <div className='twelve wide column left aligned'>
        <div className='six wide column left aligned'>
          <h1>Withdraw Funds</h1>
          <p>Almost there! Just enter your bank account number and sort code, then click below. Your funds should arrive in 1-2 days.</p>
          <form className="ui form">
            <div className="field">
              <input type="text" placeholder="Account Number" valueLink={linkState(this, 'accountNumber')}/>
            </div>
            <div className="field">
              <input type="text" placeholder="Sort Code" valueLink={linkState(this, 'sortCode')}/>
            </div>
            <button className="ui button" type="button" onClick={() => this.withdraw()}>
              Withdraw Funds
            </button>
          </form>
        </div>
      </div>
    )
  }
  withdraw() {
    const me = this.props.user
    withdraw(me.email, me.auth_token, this.state.accountNumber, this.state.sortCode)
    .then(res => {
      console.log(res) // TODO(Taimur): show success
    })
    .catch(console.log)
  }
}

function mapStateToProps(state) {
  return state.user
}

export default connect(mapStateToProps)(WithdrawPanel)
