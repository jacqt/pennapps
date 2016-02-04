import React, { Component } from 'react'

class ViewItem extends Component {

  render() {
		const item = this.props.item
		// TODO(Taimur) add remaining???
    return (
    	<div className='view-item'>
	    	<div className='name'>{item.name}</div>
	    	<div className='price'>{item.price.price_formatted}</div>
          <button onClick={() => this.props.onPayClicked()} className="buy"><img src="/img/done.png" className="tick"/>Pay Now</button>
  		</div>
    )
  }
}

export default ViewItem
