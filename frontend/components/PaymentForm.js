import React, { Component } from 'react'
import * as ajax from '../lib/ajax'


class PaymentForm extends Component {
  componentDidMount() {
    ajax.getClientToken().then((res) => {
      braintree.setup(res.client_token, "custom", {
        id: "paymentForm",
        hostedFields: {
          styles: {
            "input": {
              "font-family": "Lato, sans-serif"
            },

            // Styling a specific field
            ".number": {
            },

            // Styling element state
            ":focus": {
              "color": "blue"
            },
            ".valid": {
              "color": "green"
            },
            ".invalid": {
              "color": "red"
            },

            // Media queries
            // Note that these apply to the iframe, not the root window.
            "@media screen and (max-width: 700px)": {
              "input": {
                "font-size": "11pt"
              }
            }
          },
          number: {
            selector: "#card-number",
            placeholder: 'Card number'
          },
          cvv: {
            selector: "#cvv",
            placeholder: 'CVV'
          },
          expirationDate: {
            selector: "#expiration-date",
            placeholder: 'MM/YY'
          },
        },
        onPaymentMethodReceived: (nonce, type, details) => {
          ajax.pay($('#name').val(), $('#email').val(), 1, nonce.nonce)
        }
      });
    });
  }

  render() {
    return (
      <div>
      <div className="ui paymentModal">
            <h2>Oxford University Islamic Society</h2>
      <h1>Teddy Hall Formal</h1>
      <hr/>
        <form id="paymentForm">
            <input id="name" placeholder='Name'/>

            <input id="email" placeholder='Email'/>

            <hr/>

            <div id="card-number"></div>

            <div id="expiration-date"></div>
            <div id="cvv"></div>

            

            <input type="submit" value="Pay £8.00" />
          </form>

      </div>
      </div>
    )
  }
}

export default PaymentForm
