import React, { Component } from 'react'
import { Link } from 'react-router'

import { DOMAIN } from '../../../lib/urls'

class ViewItem extends Component {
  render() {
    const item = this.props.item
    const link = DOMAIN + '/' + this.props.userName + '/' + item.id
    return (
    	<div className='dashboard-item'>
    		<div className='inner'>
    		<div className='top'>
	    		<div className='name'>{item.name}</div>
	    		<div className='price'>{item.price.price_formatted}</div>
	    		<div className='remaining'>Sold {item.capacity - item.remaining} of {item.capacity}</div>
          <a href={link} target="_blank" className='link'>Link to item</a>
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

export default ViewItem
