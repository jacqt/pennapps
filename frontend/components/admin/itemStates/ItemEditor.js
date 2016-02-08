import React, { Component } from 'react'
import linkState from 'react-link-state'

class ItemEditor extends Component {
  constructor(props) {
    super(props)
    const item = props.item
    this.state = item ? {
      name: item.name,
      price: (item.price.price_cents/100).toFixed(2),
      capacity: item.capacity,
    } : {
      name: '',
      price: null,
      capacity: null,
    }
  }
  render() {
    return (
    	<div>
    	  <input type='text' placeholder='Name, eg. "Formal Hall"' valueLink={linkState(this, 'name')}/>
        <input type='number' step="0.01" min="0" placeholder='Price (GBP)' valueLink={linkState(this, 'price')}/>
        <input type='number' step="1" pattern="\d*" placeholder='Capacity' valueLink={linkState(this, 'capacity')}/>
      </div>
    )
  }
  submit(cb) {
    cb(this.state.name, this.state.price*100, this.state.capacity)
  }
}

export default ItemEditor
