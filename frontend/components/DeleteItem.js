import React, { Component } from 'react'

class DeleteItem extends Component {
  render() {
    return (
    	<div className='dashboard-item'>
        <button onClick={() => this.props.abort()}>NO</button>
        <button onClick={() => this.props.confirm()}>YES</button>
      </div>
    )
  }
}

export default DeleteItem
