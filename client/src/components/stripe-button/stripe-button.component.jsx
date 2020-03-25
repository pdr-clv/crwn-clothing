import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'; //se ha importado haciendo yarn axios. Es una libreria que permite hacer fetch de una forma mas adaptada a nuevos tiempos y requerimientos.

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price *100;
  const publishableKey = 'pk_test_aUE11Pf6yXn5t82m0O12h9bc00SdBYez16';
  const onToken = token => {
//axios es como fetch, se pasa un objeto, y devuelve una promesa. Se hará .then después.
    axios({
      url: 'payment',
      method:'post',
      data: {
        amount:priceForStripe,
        token
      }
    }).then(response =>{
      alert('Payment Successful');
    }).catch(err=>{
      console.error('Payment error: ', JSON.parse(err));
      alert('There was an issue with your payment. Please, make sure you use the provided credit card');
    });
  }

  return (
    <StripeCheckout 
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;