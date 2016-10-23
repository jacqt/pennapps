import React, { Component } from 'react'

class ViewItem extends Component {

  render() {
		const item = this.props.item
    return (
    	<div className='view-item'>
	    	<div className='name'>{item.name}</div>
	    	<div className='price'>{item.price.price_formatted}</div>
        { item.remaining === 0
        ? <div className='soldOut'>Sold Out  :(</div>
        : <div>
            <div className='remaining'>{item.remaining > 0 ? item.remaining+' remaining' : 'Available'}</div>
            <button onClick={() => this.props.onPayClicked()} className="buy">
              <img src="img/done.png" className="tick"/>
              Pay Now
            </button>
          </div>
        }
  		</div>
    )
  }
}

export default ViewItem
