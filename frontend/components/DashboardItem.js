import React, { Component, PropTypes } from 'react'

class DashboardItem extends Component {
  render() {
    return (
    	<div className='dashboard-item'>
    		<div className='top'>
	    		<div className='name'>{this.props.name}</div>
	    		<div className='price'>£{this.props.price}</div>
	    		<div className='remaining'>{this.props.remaining} of {this.props.capacity}<br/>remaining</div>
	    	</div>
  			<hr/>
  			<div className='item-action'>Edit Item</div>
  		</div>

    )
  }
}

export default DashboardItem