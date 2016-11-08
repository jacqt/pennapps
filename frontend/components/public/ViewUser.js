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
    ajax.getClientToken().then(response => {
      const clientToken = response.client_token;
      console.log("Got a client token", response, clientToken);
      braintree.setup(clientToken, 'custom', {
        id: "my-sample-form",
        onPaymentMethodReceived: (method) => {
          const { nonce, details, type } = method;
          $('.ui.modal').modal('hide');
          ajax.pay("testing@gmail.com", this.state.openedItem.id, nonce)
            .then(res => {
              if (res.ok) {
                this.setState({ success: true })
                this.fetchUser()
              } else {
                this.setState({ rejected: true });
                this.fetchUser()
              }
            })
        },
        hostedFields: {
          number: {
            selector: "#card-number"
          },
          cvv: {
            selector: "#cvv"
          },
          expirationDate: {
            selector: "#expiration-date"
          },
          postalCode: {
            selector: "#postal-code"
          },
        }
      });
    });
  }
  fetchUser() {
    this.props.dispatch(Actions.requestUser(this.props.params.nickname))
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
    } else if (this.state.rejected) {
      success = (
        <div className='paymentnotice paymentrejected'>Your payment has been rejected.</div>
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
        <div className='footer'>The <Link to='https://oatpay.com'>Oatpay</Link> payment platform is powered by <a href="https://www.braintreepayments.com/" target="_blank">Braintree</a>, the industry leader in online payments processing. Your details are secured using AES-256 encryption.</div>

      </div>
    )
  }
  onPayClicked(item) {
    const fee = 20 + Math.ceil(item.price.price_cents * 0.017)
    this.setState({ openedItem: item })
    this.props.history.replaceState(null, '/' + this.props.params.nickname + '/' + item.id)
    $('.ui.modal').modal('show')
    $('#item-title').text(item.name)
    $('#item-price').text(item.price.price_formatted)
  }
  onModalClose() {
    this.props.history.replaceState(null, '/' + this.props.params.nickname)
  }
}

function mapStateToProps(state) {
  return state.publicUser
}

export default connect(mapStateToProps)(ViewUser)
