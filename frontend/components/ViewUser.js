import React, { Component } from 'react'
import { connect } from 'react-redux'
import ViewItem from './ViewItem'
import PaymentForm from './PaymentForm'

import * as A from '../actions/actions'

class ViewUser extends Component {
  componentDidMount() {
    this.props.dispatch(A.requestUser(this.props.params.nickname))
  }
  render() {
    const user = this.props.user.watching
    if(!user){
      return (<div/>)
    } else {
      const items = user.items.map(item => {
      return (<ViewItem name={item.name} price={item.price} remaining='12' capacity={item.capacity} key={item.id}/>)
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
      <PaymentForm/>
      </div>
      )
    }
  }
  buy(item,price,user) {

  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(ViewUser)
