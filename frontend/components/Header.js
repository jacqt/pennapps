import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as Actions from '../actions/actions'

class Header extends Component {
  render() {
  	const { dispatch } = this.props

    const me = this.props.me
    return (
      <div className='ui top menu header'>
      		<div className='ui container'>
      			<div className='logo item'>PaySpace</div>
      			<div className='right item'>
      				<a href='#' className='item' onClick={() => dispatch(Actions.logout())}>Log Out</a>
      			</div>
      		</div>
      	</div>
    )
  }
}


function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps)(Header)