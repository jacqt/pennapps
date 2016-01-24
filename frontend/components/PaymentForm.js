import React, { Component } from 'react'
import * as ajax from '../lib/ajax'


class PaymentForm extends Component {
  componentDidMount() {
    ajax.getClientToken().then((res) => {
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
        onPaymentMethodReceived: (nonce, type, details) => {
          ajax.pay($('#first-name').val(), $('#last-name').val(), $('#email').val(), 1, nonce.nonce)
        }
      });
    });
  }

  render() {
    return (
      <div className="ui paymentModal">
        <form id="paymentForm">
            <label for="card-number">Card Number</label>
            <div id="card-number"></div>

            <label for="cvv">CVV</label>
            <div id="cvv"></div>

            <label for="expiration-date">Expiration Date</label>
            <div id="expiration-date"></div>

            <label for="first-name">First name</label>
            <input id="first-name"/>

            <label for="last-name">Last name</label>
            <input id="last-name"/>

            <label for="email">Email</label>
            <input id="email"/>
            
            <input type="submit" value="Pay" />
          </form>
      </div>
    )
  }
}

export default PaymentForm
