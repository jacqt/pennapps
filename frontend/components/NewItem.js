import React, { Component } from 'react'

class NewItem extends Component {
  render() {
    return (
    	<div className='dashboard-item'>
        <div className='top'>
        New Item
    		<input type='text' name='name' placeholder='Item name'/>
        <input type='number' step="0.01" name='price' placeholder='Item price (£)'/>
        <input type='number' name='capacity' placeholder='Capacity'/>
        <button onClick={() => this.props.action($('input[name="name"]').val(),parseFloat($('input[name="price"]').val())*100,$('input[name="capacity"]').val())}>New Item</button>
  		  </div>
      </div>
    )
  }
}

export default NewItem
