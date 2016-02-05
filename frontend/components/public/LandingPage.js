import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as Actions from '../../actions/userActions'

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

		this.setState({ signupLoading: true })
		window.setTimeout(() => dispatch(Actions.signup(email, password, password, name, nickname)), 1000)
	}
	login(email, password) {
		const { dispatch } = this.props
		dispatch(Actions.login(email, password))
	}
  componentDidMount() {
    $(".loginfield").keyup(e => {
	    if(event.keyCode == 13) {
	      $(".loginbutton").click()
	    }
	  })
	  $(".signupfield").keyup(e => {
	    if(event.keyCode == 13){
	      $(".signupbutton").click()
	    }
	  })
  }
	isError(type) {
		return this.props.error && this.props.error.type === type
	}
  render() {
    return (
      <div className='landingwrapper'>
      {this.isError('signup') ? <div className='errorbanner'>Something went wrong. Are you sure you entered all your details correctly?</div> : null}
      {this.isError('login') ? <div className='errorbanner'>Something went wrong. Are you sure you entered the right details?</div> : null}
      <div className='masthead ui'>
      	<div className='ui large top menu'>
      		<div className='ui container'>
      			<div className='logo item'>oatpay</div>
      			<div className='right item'>
              <div className='ui form login'>
                <button tabIndex='7' className="ui button loginbutton" onClick={() => this.login($('input[name="login-email"]').val(),$('input[name="login-password"]').val())}>
                Login
                </button>
                <div className='field'>
                  <input type="password" className='loginfield' tabIndex='6' name="login-password" placeholder="Password"/>
                </div>
                <div className='field'>
                  <input type="text" tabIndex='5' className='loginfield' name="login-email" placeholder="Email address"/>
                </div>
              </div>
      			</div>
      		</div>
      	</div>
      	<div className='ui text container centered'>
      		<h1>Start accepting online payments for your society.</h1>
          <h2>Say goodbye to bank transfers, collecting cash, & spreadsheets.</h2>
      		<div className={'ui form signup ' + (this.state.signupLoading ? 'loading' : '')}>
      			<div className='field'>
      				<input type="text" name="name" className='signupfield' placeholder="Society name" tabIndex='1'/>
      			</div>
      			<div className='field'>
      				<input type="text" name="email" className='signupfield' placeholder="Email address" tabIndex='2'/>
      			</div>
      			<div className='field'>
      				<input type="password" className='signupfield' name="password" placeholder="Password" tabIndex='3'/>
      			</div>
      			<button tabIndex='4' className="ui button signupbutton" onClick={() => this.signup($('input[name="name"]').val(),$('input[name="email"]').val(),$('input[name="password"]').val())}>
      			Get Started
      			</button>
      		</div>
          <div className='convinced centere'>Not convinced?</div>
          <button className='demo centered'>Check out a demo!</button>
      	</div>
      </div>
      <div className='ui row row2'>
      <h2>Oatpay saves you from the pain of bank transfers and collecting cash.</h2>
      </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
	return state.user
}

export default connect(mapStateToProps)(LandingPage)
