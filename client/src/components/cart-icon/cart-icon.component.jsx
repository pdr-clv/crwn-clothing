import React from 'react';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';

import { SpanItemCount,
  ShoppingIcon,
  CartIconContainer
  } from './cart-icon.styles';


const CartIcon = ({toggleCartHidden , itemCount}) => (
  <CartIconContainer onClick={()=>toggleCartHidden()}>
    <ShoppingIcon />
    <SpanItemCount>{ itemCount }</SpanItemCount>
  </CartIconContainer>

);

//se utiliza el selector selectCartItemsCount, definido en cart.selectors.js en la carpeta de redux/cart.
//la forma primitiva sería valida, pero al hacer cualquier modificación en el state, en algúna propiedad que ni siquiera tiene que ver con cart, volvería a renderizar el componente, y sería innecesario.
const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount
});

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});
//ahora podemos utilizar la "función" toggleCatHidden en el componente CartIcon para cambiar al estado hidden.
export default connect(mapStateToProps,mapDispatchToProps)(CartIcon);