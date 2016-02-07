import React, { Component } from 'react'
import linkState from 'react-link-state'
import { connect } from 'react-redux'
import * as _ from 'underscore'

import { updateUser } from '../../lib/ajax'
import * as Actions from '../../actions/userActions'

class EditUser extends Component {
  constructor(props) {
    super(props)
    this.state = this.getStateByProps(props)
  }
  getStateByProps(props) {
    const me = props.user
    return {
      nickname: me.nickname,
      accountNumber: me.account_number,
      sortCode: me.sort_code,
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState(this.getStateByProps(nextProps))
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
          {this.state.error ? <p>ERROR</p> : null}
          <button className="ui button" type="button" onClick={() => this.update()}>
            Update
          </button>
        </form>
      </div>
    )
  }
  update() {
    const me = this.props.user
    const delta = {
      nickname: this.state.nickname,
      account_number: this.state.accountNumber,
      sort_code: this.state.sortCode,
    }
    updateUser(me.email, me.auth_token, me.nickname, delta).then(res => {
      if (res.error) {
        this.setState({ error: res.error })
      }
      else {
        this.setState({ error: undefined })
      }
      this.props.dispatch(Actions.reLogin(me.email, me.auth_token))
    })
  }
}

function mapStateToProps(state) {
  return state.user
}

export default connect(mapStateToProps)(EditUser)
