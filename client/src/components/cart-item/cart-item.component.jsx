import React from 'react';

import { ItemDetailsContainer,
  ImgItem,
  CartItemContainer
} from './cart-item.styles';


//se le pasará el item entero, se desestructura de esta forma ({item: ..., ..., ...})
const CartItem = ({ item: {imageUrl, price, name, quantity} }) => (
  <CartItemContainer>
    <ImgItem src={imageUrl} alt='item' />
    <ItemDetailsContainer>
      <span>{name}</span>
      <span>{quantity} x ${price}</span>
    </ItemDetailsContainer>
  </CartItemContainer>
);

export default CartItem;