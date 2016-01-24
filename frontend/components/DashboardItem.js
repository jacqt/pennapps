import React, { Component } from 'react'

class DashboardItem extends Component {
  render() {
    return (
    	<div className='dashboard-item'>
    		<div className='inner'>
    		<div className='top'>
	    		<div className='name'>{this.props.name}</div>
	    		<div className='price'>£{this.props.price}</div>
	    		<div className='remaining'>{this.props.remaining} of {this.props.capacity}<br/>remaining</div>
	    	</div>
  			<hr/>
  			<div className='item-action' onClick={() => this.props.onEdit()}>Edit Item</div>
  			</div>
  		</div>
    )
  }
}

export default DashboardItem
