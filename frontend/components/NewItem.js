import React, { Component, PropTypes } from 'react'

class NewItem extends Component {
  render() {
    return (
    	<div className='dashboard-item'>
        <div className='top'>
    		<input type='text' name='name' placeholder='Item name'/>
        <input type='number' name='price' placeholder='Item price'/>
        <input type='number' name='capacity' placeholder='Capacity'/>
        <button onClick={() => this.props.onAdd($('input[name="name"]').val(),$('input[name="price"]').val(),$('input[name="capacity"]').val())}>Add Item</button>
  		  </div>
      </div>
    )
  }
}

export default NewItem