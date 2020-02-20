import React from 'react';
import CartItem from '../cart-item/cart-item.component';
import CustomButton from '../custom-button/custom-button.component';

//para mejorar la experiencia del usuario. traeremos el evento HiddenDropdown del action de cart.actions, y cuando el usuario clique en abrir checkoutPage, automaticamente se haga hidden el dropdown
import { toggleCartHidden } from'../../redux/cart/cart.actions';
// cuando se quiere acceder a una propiedad del state que es on/oof, como toggleCartHidden, si se va a utilizar en el mismo componente que recibe


import { connect } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
// se importa withRouter, que almacena el history y localización de objetos de las rutas de nuestra url, y se puede direccionar a alguna ruta definida en App.js de las páginas que tendrá la aplicación. Es una función de orden superior, y te evita tener que estar pasando los parámetros de la ruta de la url donde quieres que vaya la aplicación al hacer clic en algun botón como Go to Checkout, que abrirá la página CheckoutPage

import './cart-dropdown.styles.scss';
// se pasa un dispatch, desestructurado de las propiedades que tiene checkoutPage.
const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {
        cartItems.length ?
        cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={ cartItem } />
        ))
        :
        <span className='empty-message'>Your cart is empty</span>
      }
    </div>
    <CustomButton 
      onClick={()=>{
        history.push('/checkout');
        dispatch(toggleCartHidden());
      }
    }
    >GO TO CHECKOUT</CustomButton>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
})


export default withRouter(connect(mapStateToProps)(CartDropdown));

//se puede envolver una función de orden superior, dentro de otra función de orden superior, porque siempre devuelven estas funciones objetos, y vale para poder encadenar funciones de orden superior.