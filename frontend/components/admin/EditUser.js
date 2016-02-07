import React, { Component } from 'react'
import linkState from 'react-link-state'
import { connect } from 'react-redux'
import * as _ from 'underscore'

import { updateUser } from '../../lib/ajax'

class EditUser extends Component {
  constructor(props) {
    super(props)
    const me = props.user
    this.state = {
      nickname: me.nickname,
      accountNumber: me.account_number,
      sortCode: me.sort_code,
    }
  }
  render() {
    // TODO(Taimur) styling, show errors???
    return (
      <div className='twelve wide column left aligned'>
        <h1>Update User</h1>
        <form className="ui form withdraw">
          <div className="field">
            <input type="text" placeholder="URL name" valueLink={linkState(this, 'nickname')}/>
          </div>
          <div className="field">
            <input type="text" placeholder="Account Number" valueLink={linkState(this, 'accountNumber')}/>
          </div>
          <div className="field">
            <input type="text" placeholder="Sort Code" valueLink={linkState(this, 'sortCode')}/>
          </div>
          <button className="ui button" type="button" onClick={() => this.update()}>
            Update
          </button>
        </form>
      </div>
    )
  }
  update() {
    const me = this.props.user
    updateUser(me.email, me.auth_token, me.nickname, {
      nickname: this.state.nickname,
      account_number: this.state.accountNumber,
      sort_code: this.state.sortCode,
    })
  }
}

function mapStateToProps(state) {
  return state.user
}

export default connect(mapStateToProps)(EditUser)
