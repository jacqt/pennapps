import React, { Component, PropTypes } from 'react'

class LandingPage extends Component {
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
      		<form className='ui form signup'>
      			<div className='field'>
      				<input type="text" name="name" placeholder="Society name"/>
      			</div>
      			<div className='field'>
      				<input type="text" name="email" placeholder="Email address"/>
      			</div>
      			<div className='field'>
      				<input type="password" name="password" placeholder="Password"/>
      			</div>
      			<button className="ui button" type="submit">Get Started</button>
      		</form>
      	</div>
      </div>
    )
  }
}

export default LandingPage
