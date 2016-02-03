import React, { Component } from 'react'
import { Link } from 'react-router'

class DashboardItem extends Component {
  render() {
    const item = this.props.item
    return (
    	<div className='dashboard-item'>
    		<div className='inner'>
    		<div className='top'>
	    		<div className='name'>{item.name}</div>
	    		<div className='price'>{item.price.price_formatted}</div>
	    		<div className='remaining'>Capacity: {item.capacity}</div>
	    	</div>
  			<hr/>
        <div className='item-action delete' onClick={() => this.props.onArchive()}><a href='#'>Archive</a></div>
  			<div className='item-action edit' onClick={() => this.props.onEdit()}><a href='#'>Edit</a></div>
        <div className='item-action edit'><Link to={'/'} query={{itemId : item.id}}>Payments</Link></div>
  			</div>
  		</div>
    )
  }
}

export default DashboardItem
