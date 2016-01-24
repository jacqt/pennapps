import React, { Component } from 'react'

class ViewItem extends Component {
  render() {
    return (
    	<div className='view-item'>
	    		<div className='name'>{this.props.name}</div>
	    		<div className='price'>£{this.props.price}</div>
  		</div>

    )
  }
}

export default ViewItem
