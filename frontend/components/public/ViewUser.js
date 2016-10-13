import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as _ from 'underscore'

import ViewItem from './ViewItem'

import * as Actions from '../../actions/publicUserActions'
import * as ajax from '../../lib/ajax'

class ViewUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openedItem: null,
      success: false,
    }
    this.stripeHandler = StripeCheckout.configure({
      key: 'pk_live_Y55dq0Dd5cCoQNPn3dfsuqeu',
      image: '/img/stripe.png',
      locale: 'auto',
      currency: 'GBP',
      token: (token) => {
        ajax.pay(token.email, this.state.openedItem.id, token.id)
        .then(res => {
          this.setState({ success: true })
          this.fetchUser()
        })
      }
    });
  }
  fetchUser() {
    let nickname = this.props.params.nickname
    if (nickname) nickname = nickname.toLocaleLowerCase()
    this.props.dispatch(Actions.requestUser(nickname))
  }
  componentDidMount() {
    this.fetchUser()
  }
  componentWillReceiveProps(nextProps) {
    const user = nextProps.user
    if (!user) return
    if (document.title !== user.name) {
      document.title = user.name+' - Oatpay'
    }
    const itemId = nextProps.params.itemId
    if (!itemId) return
    if (this.state.openedItem && this.state.openedItem.id == itemId) return
    const items = user.items
    const index = _.findIndex(items, (item) => item.id == itemId)
    if (index === -1) return
    this.onPayClicked(items[index])
  }
  render() {
    const user = this.props.user

    if (this.props.isFetching){
      return <div/>
    }
    if (!user) {
      return (
        <p>invalid URL</p>
      )
    }
    const items = _.sortBy(user.items, 'created_at').filter(item => !item.archived).map(item => {
      return (<ViewItem item={item} key={item.id} onPayClicked={() => this.onPayClicked(item)}/>)
    })
    const emptyView = (
      <div><br/><p>Awh shucks! This society doesn&apos;t seem to have any items right now - check back later.</p><br/>
      <img src='http://www.jonathankettleborough.com/wp-content/uploads/2012/12/Please-sir-may-I-have-some-more.jpg'/></div>
    )
    let success = null
    if (this.state.success) {
      success = (
        <div className='paymentnotice paymentsuccess'>Your payment has been accepted!</div>
      )
    }
    const openedItem = this.state.openedItem
    return (
      <div className='wrapper'>

        <div className='wrap'>
          <div className='main'>
            {success}
          	<div className='ui cover'>
              <div className='ui text container center aligned middle'>
                <h1>{user.name}</h1>
              </div>
            </div>
            <div className='ui container centered item-list'>
              {items.length ? items : emptyView}
            </div>
          </div>
        </div>
        
        <div className='footer'>
          <a href='https://getcashew.com' target='_blank'><img src='img/cashew.png' className='cashew-logo'/></a>
          The <Link to='https://oatpay.com'>Oatpay</Link> payment platform is powered by <a href="https://getcashew.com" target="_blank">Cashew</a>. Your details are secured using AES-256 encryption.
        </div>
      </div>
    )
  }
  onPayClicked(item) {
    const fee = 20 + Math.ceil(item.price.price_cents * 0.017)
    this.stripeHandler.open({
      name: item.name+' - '+item.price.price_formatted,
      description: '+20p +1.7% card fee',
      amount: item.price.price_cents + fee,
      allowRememberMe: true,
      closed: this.onModalClose.bind(this),
    })
    this.setState({ openedItem: item })
    this.props.history.replaceState(null, '/' + this.props.params.nickname + '/' + item.id)
  }
  onModalClose() {
    this.props.history.replaceState(null, '/' + this.props.params.nickname)
  }
}

function mapStateToProps(state) {
  return state.publicUser
}

export default connect(mapStateToProps)(ViewUser)
