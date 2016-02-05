import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as Actions from '../../actions/userActions'

class Header extends Component {
  render() {
  	const { dispatch } = this.props

    return (
      <div className='ui top menu header'>
      		<div className='ui container'>
      			<div className='logo item'><img src='img/oat.png' className='oat'/>oatpay</div>
      			<div className='right item'>
      				<a href='#' className='item' onClick={() => dispatch(Actions.logout())}>Log Out</a>
      			</div>
      		</div>
      	</div>
    )
  }
}


function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(Header)
