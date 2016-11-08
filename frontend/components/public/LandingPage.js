import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import * as Actions from '../../actions/userActions'

class LandingPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			signupLoading: false,
		}
	}
	signup(name, email, password) {
    fbq('track', 'CompleteRegistration');
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
  render() {
		let error = null
		if (this.props.error) {
			error = (
				<div className='errorbanner'>Something went wrong: {this.props.error.message}</div>
			)
		}
		let heading = 'Hate bank transfers? So do we.'
		if (this.props.referer === 'fb') {
			heading = 'Start accepting online payments.' // TODO(Taimur)
		}
    return (
      <div className='landingwrapper'>
			{error}
      <div className='masthead ui'>
      	<div className='ui large top menu'>
      		<div className='ui container'>
      			<div className='logo item'>St Hugh's Ball</div>
      			<div className='right item'>
              <div className='ui form login'>
                <button tabIndex='7' className="ui button loginbutton" onClick={() => this.login($('input[name="login-email"]').val(),$('input[name="login-password"]').val())}>
                Login
                </button>
                <div className='field'>
                  <input type="password" className='loginfield' tabIndex='6' name="login-password" placeholder="Password"/>
                </div>
                <div className='field'>
                  <input type="email" tabIndex='5' className='loginfield' name="login-email" placeholder="Email address"/>
                </div>
              </div>
      			</div>
      		</div>
      	</div>
      </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
	return state.user
}

export default connect(mapStateToProps)(LandingPage)
