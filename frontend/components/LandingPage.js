import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as Actions from '../actions/actions'

class LandingPage extends Component {
	signup(name, email, password) {
		const { dispatch } = this.props
		const nickname = name.replace(/\s+/g, '')

		$('.signup').addClass('loading');
		window.setTimeout(() => dispatch(Actions.signup(email,password,password,name,nickname)), 2000);
	}

  render() {
    return (
      <div className='masthead ui'>
      	<div className='ui large top menu'>
      		<div className='ui container'>
      			<div className='logo item'>PaySpace</div>
      			<div className='right item'>
      				<a className='item'>Login</a>
      			</div>
      		</div>
      	</div>
      	<div className='ui text container centered'>
      		<h1>Start accepting online payments in 60 seconds.</h1>
      		<div className='ui form signup'>
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
						{this.props.error ? 'ERROR (TODO)' : null}
      		</div>
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
