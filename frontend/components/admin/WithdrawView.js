import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as _ from 'underscore'

import { withdraw } from '../../lib/ajax'

class WithdrawPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    const me = this.props.user
    let content = (
      <div>
        <p>Please go to 'Edit User' and enter your bank details first. TODO(Taimur)</p>
      </div>
    )
    if (me.sort_code && me.account_number) {
      content = (
        <div>
          <p>Almost there! Just click below. Your funds should arrive in 1-2 days.</p>
          <button className="ui button" type="button" onClick={() => this.withdraw()}>
            Withdraw Funds
          </button>
        </div>
      )
    }

    return (
      <div className='twelve wide column left aligned'>
        <div className='six wide column left aligned'>
          <h1>Withdraw Funds</h1>
          {content}
        </div>
      </div>
    )
  }
  withdraw() {
    const me = this.props.user
    withdraw(me.email, me.auth_token)
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
