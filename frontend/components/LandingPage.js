import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as Actions from '../actions/actions'

class LandingPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			signupLoading: false,
		}
	}
	signup(name, email, password) {
		const { dispatch } = this.props
		const nickname = name.replace(/\s+/g, '')

		this.setState({signupLoading: true})
		window.setTimeout(() => dispatch(Actions.signup(email,password,password,name,nickname)), 2000)
	}
	login(email, password) {
		const { dispatch } = this.props
		dispatch(Actions.login(email,password))
	}
  render() {
    return (
      <div>
      <div className='masthead ui'>
      	<div className='ui large top menu'>
      		<div className='ui container'>
      			<div className='logo item'>PaySpace</div>
      			<div className='right item'>
              <div className='ui form login'>
            <button className="ui button" onClick={() => this.login($('input[name="login-email"]').val(),$('input[name="login-password"]').val())}>
            Login
            </button>
            <div className='field'>
              <input type="password" name="login-password" placeholder="Password"/>
            </div>
            <div className='field'>
              <input type="text" name="login-email" placeholder="Email address"/>
            </div>
            {this.props.login_error ? 'ERROR (TODO)' : null}
          </div>
      			</div>
      		</div>
      	</div>
      	<div className='ui text container centered'>
      		<h1>Start accepting online payments in 60 seconds.</h1>
      		<div className={'ui form signup ' + (this.state.signupLoading ? 'loading' : '')}>
      			<div className='field'>
      				<input type="text" name="name" placeholder="Society name"/>
      			</div>
      			<div className='field'>
      				<input type="text" name="email" placeholder="Email address"/>
      			</div>
      			<div className='field'>
      				<input type="password" name="password" placeholder="Password"/>
      			</div>
      			<button className="ui button" onClick={() => this.signup($('input[name="name"]').val(),$('input[name="email"]').val(),$('input[name="password"]').val())}>
      			Get Started
      			</button>
						{this.props.signup_error ? 'ERROR (TODO)' : null}
      		</div>
      	</div>
      </div>
      <div className='ui row row2'>
      <h2>Payspace lets you accept online payments for your society events.</h2>
      </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
	if (state.user.me) return state.user.me
	else return {}
}

export default connect(mapStateToProps)(LandingPage)
