import React from 'react';

//necesitamos las librerias del state y reselect para pasar las propiedades del state a ChekoutPage, y que llene la página de los items que están en la compra
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import { 
  TextWarning, 
  TextTotal,
  HeaderBlock,
  CheckOutHeaderContainer,
  CheckOutPageContainer} from './checkout.styles';

const CheckoutPage = ({cartItems , total}) => (
  <CheckOutPageContainer>
    <CheckOutHeaderContainer>
      <HeaderBlock>
        <span>Product</span>
      </HeaderBlock>
      <HeaderBlock>
        <span>Description</span>
      </HeaderBlock>
      <HeaderBlock>
        <span>Quantity</span>
      </HeaderBlock>
      <HeaderBlock>
        <span>Price</span>
      </HeaderBlock>
      <HeaderBlock>
        <span>Remove</span>
      </HeaderBlock>
    </CheckOutHeaderContainer>
    {
      cartItems.map(cartItem=>(<CheckoutItem key={cartItem.id} cartItem={cartItem}/>))
    }
    <TextTotal className='total'>
      Total: ${total}
    </TextTotal>
    <TextWarning>
    *Please use the following test credit card for payments *<br/>
    4242 4242 4242 4242 - Exp: 01/21 - CVV: 123

    </TextWarning>
    <StripeCheckoutButton price={total} />
  </CheckOutPageContainer>
);

const mapStateToProps = createStructuredSelector({
  cartItems:selectCartItems,
  total:selectCartTotal
})
export default connect(mapStateToProps)(CheckoutPage);