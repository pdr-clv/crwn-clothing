import CartActionTypes from './cart.types';

//no se le pasa payload, porque es sólo hacer toggle !state, y no necesita payload este action.
export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload:item
});