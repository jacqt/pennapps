import React, { Component } from 'react'

class NewItem extends Component {
  render() {
    const title = this.props.title == 'Save' ? 'Edit Item' : 'New Item';
    return (
    	<div className='dashboard-item'>
        <div className='top'>
        {title}
    		<input type='text' name='name' placeholder='Item name'/>
        <input type='number' name='price' placeholder='Item price'/>
        <input type='number' name='capacity' placeholder='Capacity'/>
        <button onClick={() => this.props.action($('input[name="name"]').val(),$('input[name="price"]').val(),$('input[name="capacity"]').val())}>{this.props.title}</button>
  		  </div>
      </div>
    )
  }
}

export default NewItem
