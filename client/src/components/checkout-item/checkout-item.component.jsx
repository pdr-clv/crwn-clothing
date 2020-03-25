import React from 'react';
import { connect } from 'react-redux';
import { clearItemFromCart,addItem,removeItem } from '../../redux/cart/cart.actions';

import { 
  CheckOutItemContainer,
  ImgContainer,
  TextContainer,
  QuantityContainer,
  RemoveButtonContainer
  } from './checkout-item.styles';

const CheckoutItem = ({ cartItem, clearItem,addItem,removeItem }) => {
  const { name, imageUrl, quantity, price } = cartItem;
  return(
  <CheckOutItemContainer>
    <ImgContainer className='image-container'>
      <img src={imageUrl} alt='item' />
    </ImgContainer>
    <TextContainer>{name}</TextContainer>
    <QuantityContainer>
      <div className='arrow' onClick={()=>
        removeItem(cartItem)
      }>&#10094;</div>
      <span className='value'>{quantity}</span>
      <div className='arrow' onClick={()=>
        addItem(cartItem)
      }>&#10095;</div>
    </QuantityContainer>
    <TextContainer>{price}</TextContainer>
    <RemoveButtonContainer onClick={()=>{
      alert('Item removed from cart');
      clearItem(cartItem);
    }}>&#10005;</RemoveButtonContainer>
  </CheckOutItemContainer>

)};

const mapDispatchToProps = dispatch =>({
  clearItem: item => dispatch(clearItemFromCart(item)),
  addItem: item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item))
})

export default connect(null,mapDispatchToProps)(CheckoutItem);