import React, { Component } from 'react'

class EditItem extends Component {
  render() {
    const oldItem = this.props.oldItem
    return (
    	<div className='dashboard-item'>
        <div className='top'>
        Edit Item
    	  <input type='text' name='name' placeholder='Item name' defaultValue={oldItem ? oldItem.name : null}/>
        <input type='number' step="0.01" name='price' placeholder='Item price' defaultValue={oldItem ? (oldItem.price.price_cents/100).toFixed(2) : null}/>
        <input type='number' name='capacity' placeholder='Capacity' defaultValue={oldItem ? oldItem.capacity : null}/>
        <button className='cancelEdit' onClick={() => this.props.abort()}>Cancel</button>
        <button className='saveEdit' onClick={() => this.props.action($('input[name="name"]').val(),parseFloat($('input[name="price"]').val())*100,$('input[name="capacity"]').val())}>Save</button>
  		  </div>
      </div>
    )
  }
}

export default EditItem
