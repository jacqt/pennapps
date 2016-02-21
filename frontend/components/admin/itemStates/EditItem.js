import React, { Component } from 'react'

import ItemEditor from './ItemEditor'

class EditItem extends Component {
  componentDidMount() {
    $(".edit-item input").keyup(e => {
      if(event.keyCode == 13){
        $(".saveEdit").click()
      }
    })
  }
  render() {
    const oldItem = this.props.oldItem
    return (
    	<div className='dashboard-item edit-item'>
        <div className='top'>
        Edit Item
    	  <ItemEditor item={oldItem} ref='editor'/>
        <button className='cancelEdit' onClick={() => this.props.abort()}>Cancel</button>
        <button className='saveEdit' onClick={() => this.refs.editor.submit(this.props.action)}>Save</button>
  		  </div>
      </div>
    )
  }
}

export default EditItem
