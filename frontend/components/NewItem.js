import React, { Component } from 'react'

class NewItem extends Component {
  render() {
    const title = this.props.title == 'Save' ? 'Edit Item' : 'New Item';
    const oldItem = this.props.oldItem
    return (
    	<div className='dashboard-item'>
        <div className='top'>
        {title}
    		<input type='text' name='name' placeholder='Item name' defaultValue={oldItem ? oldItem.name : null}/>
        <input type='number' step="0.01" name='price' placeholder='Item price (£)' defaultValue={oldItem ? (oldItem.price/100).toFixed(2) : null}/>
        <input type='number' name='capacity' placeholder='Capacity' defaultValue={oldItem ? oldItem.capacity : null}/>
        <button onClick={() => this.props.action($('input[name="name"]').val(),parseFloat($('input[name="price"]').val())*100,$('input[name="capacity"]').val())}>{title}</button>
  		  </div>
      </div>
    )
  }
}

export default NewItem
