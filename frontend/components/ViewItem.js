import React, { Component } from 'react'

class ViewItem extends Component {
	
  render() {
    return (
    	<div className='view-item'>
	    	<div className='name'>{this.props.name}</div>
	    	<div className='price'>{this.props.price.price_formatted}</div>
          <button onClick={() => this.props.onPayClicked()} className="buy"><img src="img/done.png" className="tick"/>Pay Now</button>
  		</div>
    )
  }
}

export default ViewItem
