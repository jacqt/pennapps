import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as ajax from '../lib/ajax'


class PaymentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    this.node = ReactDOM.findDOMNode(this)

    ReactDOM.render((
      <div>
      <div className="ui modal paymentModal">
        But item {this.props.itemId}
        <form id="paymentForm">
          <label htmlFor="card-number">Card Number</label>
          <div id="card-number"></div>

          <label htmlFor="cvv">CVV</label>
          <div id="cvv"></div>

          <label htmlFor="expiration-date">Expiration Date</label>
          <div id="expiration-date"></div>

          <label htmlFor="first-name">First name</label>
          <input id="first-name"/>

          <label htmlFor="last-name">Last name</label>
          <input id="last-name"/>

          <label htmlFor="email">Email</label>
          <input id="email"/>

          <input type="submit" value="Pay" />
        </form>
      </div>
      </div>
    ), this.node, () => {
      $('.paymentModal').modal({
        onHide: () => {
          this.props.onClose()
        }
      }).modal('show')

      ajax.getClientToken().then((res) => {
        const that = this
        braintree.setup(res.client_token, "custom", {
          id: "paymentForm",
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
          },
          onReady: (integration) => {
            that.integration = integration
          },
          onPaymentMethodReceived: (nonce, type, details) => {
            ajax.pay($('#first-name').val(), $('#last-name').val(), $('#email').val(), 1, nonce.nonce)
          }
        });
      });

    })
  }

  componentWillUnmount() {
    $('body .modals').remove()
    if (this.integration) {
      this.integration.teardown(() => {
        this.integration = null
      })
    }
  }

  render() {
    return <div/>
  }
}

export default PaymentForm
