import CartActionTypes from './cart.types';
import { addItemToCart,removeItemFromCart } from './cart.utils';

const INITIAL_STATE = {
  hidden: true,
  cartItems: []
};
// como es habitual, se le asigna un initial state, si no se le pasa ningun state.
const cartReducer = (state = INITIAL_STATE,action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
// como va a ser toggle, no hace falta pasarle ningun parametro ni payload para modificar el state. se hará con un !state.
      return {
        ...state,
        hidden:!state.hidden
      };
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          cartItem => cartItem.id !== action.payload.id )
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems,action.payload)
      };
    case CartActionTypes.ADD_ITEM:
       return {
        ...state,
//(forma primitiva)de esta forma poniendo el ...state.cartItems, el array cartItems conserva todos los cartItems que tiene, y añade el payload
//        cartItems:[...state.cartItems, action.payload]
//para que cada vez que se añada el cartItems, si es duplicado se aumente la cantidad en uno, se utiliza la función definida en cart.utils AddItemToCart
        cartItems: addItemToCart(state.cartItems, action.payload)
      };
    case CartActionTypes.CLEAR_CART:
      return {
// se quiere poner los cartItems a cero, por eso se hará un cartItems:[]
        ...state,
        cartItems: []
      };
    case CartActionTypes.SET_CART_FROM_FIREBASE:
      return {
  // se quiere guardar en el state, en cartItems lo que hay guardado en Firebase.
        ...state,
        cartItems: action.payload
      };
    default:
      return state;
  }
};

export default cartReducer;