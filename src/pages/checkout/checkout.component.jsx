import React from 'react';

//necesitamos las librerias del state y reselect para pasar las propiedades del state a ChekoutPage, y que llene la página de los items que están en la compra
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import './checkout.styles.scss';

const CheckoutPage = ({cartItems , total}) => (
  <div className='checkout-page'>
    <div className='checkout-header'>
      <div className='header-block'>
        <span>Product</span>
      </div>
      <div className='header-block'>
        <span>Description</span>
      </div>
      <div className='header-block'>
        <span>Quantity</span>
      </div>
      <div className='header-block'>
        <span>Price</span>
      </div>
      <div className='header-block'>
        <span>Remove</span>
      </div>
    </div>
    {
      cartItems.map(cartItem=>(<CheckoutItem key={cartItem.id} cartItem={cartItem}/>))
    }
    <div className='total'>
      Total: ${total}
    </div>
    <div class='text-warning'>
    *Please use the following test credit card for payments *<br/>
    4242 4242 4242 4242 - Exp: 01/21 - CVV: 123

    </div>
    <StripeCheckoutButton price={total} />
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems:selectCartItems,
  total:selectCartTotal
})
export default connect(mapStateToProps)(CheckoutPage);