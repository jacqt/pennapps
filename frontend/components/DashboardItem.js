import React, { Component } from 'react'

class DashboardItem extends Component {
  render() {
    return (
    	<div className='dashboard-item'>
    		<div className='inner'>
    		<div className='top'>
	    		<div className='name'>{this.props.name}</div>
	    		<div className='price'>£{this.props.price}</div>
	    		<div className='remaining'>Capacity: {this.props.capacity}</div>
	    	</div>
  			<hr/>
        <div className='item-action delete' onClick={() => this.props.onEdit()}><a href='#'>Delete</a></div>
  			<div className='item-action edit' onClick={() => this.props.onEdit()}><a href='#'>Edit Item</a></div>
  			</div>
  		</div>
    )
  }
}

export default DashboardItem
