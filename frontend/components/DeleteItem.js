import React, { Component } from 'react'

class DeleteItem extends Component {
  render() {
    return (
    	<div className='dashboard-item'>
    	<div className="warning">Are you sure you want to delete this item? This cannot be undone.</div>
        <button className="cancel" onClick={() => this.props.abort()}>Cancel</button>
        <button className="danger" onClick={() => this.props.confirm()}>Delete</button>
      </div>
    )
  }
}

export default DeleteItem
