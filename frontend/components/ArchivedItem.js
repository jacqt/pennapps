import React, { Component } from 'react'

class ArchivedItem extends Component {
  render() {
    const item = this.props.item
    return (
    	<div className='dashboard-item'>
    		<div className='inner'>
    		<div className='top'>
	    		<div className='name'>{item.name}</div>
	    		<div className='price'>£{(item.price/100).toFixed(2)}</div>
	    		<div className='remaining'>Capacity: {item.capacity}</div>
	    	</div>
  			<hr/>
        <div className='item-action edit' onClick={() => this.props.onUnarchive()}><a href='#'>Un-archive</a></div>
  			<div className='item-action delete' onClick={() => this.props.onDelete()}><a href='#'>Delete</a></div>
  			</div>
  		</div>
    )
  }
}

export default ArchivedItem
