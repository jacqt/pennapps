import React, { Component } from 'react'

class DialogItem extends Component {
  render() {
    return (
    	<div className='dashboard-item'>
    	<div className="warning">{this.props.question}</div>
        <button className="cancel" onClick={() => this.props.abort()}>Cancel</button>
        <button className="danger" onClick={() => this.props.confirm()}>{this.props.confirmTitle}</button>
      </div>
    )
  }
}

export default DialogItem
