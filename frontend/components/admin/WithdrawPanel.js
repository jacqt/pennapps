import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as Actions from '../../actions/userActions'

import { withdraw } from '../../lib/ajax'

class WithdrawPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    const me = this.props.user
    return (
      <div>
        <a href="#" onClick={() => this.withdraw()}>DO IT</a>
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

export default connect(mapStateToProps)(WithdrawPanel)
