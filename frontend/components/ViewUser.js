import React, { Component } from 'react'
import { connect } from 'react-redux'
import ViewItem from './ViewItem'
import PaymentForm from './PaymentForm'

import * as A from '../actions/actions'

class ViewUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadedModal: false,
      showModal: true,
      itemId: null,
    }
  }
  componentDidMount() {
    this.props.dispatch(A.requestUser(this.props.params.nickname))
  }
  render() {
    const user = this.props.user.watching
    if(!user){
      return (<div/>)
    } else {
      const items = user.items.map(item => {
      return (<ViewItem name={item.name} price={item.price} remaining='12' capacity={item.capacity} key={item.id} onPayClicked={() => this.onPayClicked(item.id)}/>)
    })
    return (
      <div>
    	<div className='ui cover'>
        <div className='ui text container center aligned middle'>
          <h1>{user.name}</h1>
        </div>
      </div>
      <div className='ui container centered item-list'>
      {items}
      </div>
        { this.state.isModalOpen ? <PaymentForm itemId={this.state.itemId} onClose={() => this.onModalClose()}/> : null}
      </div>
      )
    }
  }
  onPayClicked(id) {
    this.setState({ isModalOpen: true, itemId: id })
  }
  onModalClose() {
    this.setState({ isModalOpen: false, itemId: null })
  }
  buy(item,price,user) {

  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(ViewUser)
