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
        <p>We need to get your bank details before you can withdraw your money - please go to 'Account Settings' and enter your bank details first!</p>
      </div>
    )
    if (me.sort_code && me.account_number) {
      content = (
        <div>
          <p id='withdrawtext'>Almost there! Just click below. Your funds should arrive in 1-2 days.</p>
          <button id='withdrawbutton' className="ui button" type="button" onClick={() => this.withdraw()}>
            Withdraw Funds
          </button>
<div className="ui positive message hidden successmessage">
  <p><b>Cha-ching!</b> Your money should arrive in 1-2 days.</p>
</div>
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
      console.log(res)
      $('#withdrawtext').hide();
      $('#withdrawbutton').hide();
      $('.successmessage').show();
    })
    .catch(console.log)
  }
}

function mapStateToProps(state) {
  return state.user
}

export default connect(mapStateToProps)(WithdrawPanel)
