import React, { Component } from 'react'
import * as ajax from '../lib/ajax'


class PaymentForm extends Component {
   componentDidMount() {
    ajax.getClientToken().then((res) => {
      braintree.setup(res.client_token, "custom", {
        id: "paymentform",
        hostedFields: {
          number: {
            selector: "#card-number"
          },
          cvv: {
            selector: "#cvv"
          },
          expirationDate: {
            selector: "#expiration-date"
          }
        }
      });
    });
  }

  render() {
    return (
    	<form className='ui modal paymentform' id='paymentform'>
      <label htmlFor="card-number">Card Number</label>
      <div id="card-number"></div>

      <label htmlFor="cvv">CVV</label>
      <div id="cvv"></div>

      <label htmlFor="expiration-date">Expiration Date</label>
      <div id="expiration-date"></div>

      <input type="submit" value="Pay"/>
    </form>
    )
  }
}

export default PaymentForm
