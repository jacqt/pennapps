import React, { Component } from 'react'

class EditItem extends Component {
  render() {
    const oldItem = this.props.oldItem
    return (
    	<div className='dashboard-item'>
        <div className='top'>
        Edit Item
    	  <input type='text' name='name' placeholder='Item name' defaultValue={oldItem ? oldItem.name : null}/>
        <input type='number' name='price' placeholder='Item price' defaultValue={oldItem ? oldItem.price : null}/>
        <input type='number' name='capacity' placeholder='Capacity' defaultValue={oldItem ? oldItem.capacity : null}/>
        <button onClick={() => this.props.action($('input[name="name"]').val(),$('input[name="price"]').val(),$('input[name="capacity"]').val())}>Edit Item</button>
  		  </div>
      </div>
    )
  }
}

export default EditItem
