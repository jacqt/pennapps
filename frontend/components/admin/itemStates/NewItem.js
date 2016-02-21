import React, { Component } from 'react'

import ItemEditor from './ItemEditor'

class NewItem extends Component {
  componentDidMount() {
    $(".new-item input").keyup(e => {
      if(event.keyCode == 13){
        $(".newitembutton").click()
      }
    })
  }
  render() {
    return (
    	<div className='dashboard-item new-item'>
        <div className='top'>
        Add a New Item!
    		<ItemEditor ref='editor'/>
        <button className='newitembutton' onClick={() => this.refs.editor.submit(this.props.action)}>+ Add Item</button>
  		  </div>
      </div>
    )
  }
}

export default NewItem
