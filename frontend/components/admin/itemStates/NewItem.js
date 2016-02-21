import React, { Component } from 'react'

import ItemEditor from './ItemEditor'

class NewItem extends Component {
  render() {
    return (
    	<div className='dashboard-item'>
        <div className='top'>
        Add a New Item!
    		<ItemEditor ref='editor'/>
        <button onClick={() => this.onAdd()}>+ Add Item</button>
  		  </div>
      </div>
    )
  }
  onAdd() {
    this.refs.editor.submit(this.props.action)
    this.refs.editor.clear()
  }
}

export default NewItem
