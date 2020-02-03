import CartActionTypes from './cart.types';

const INITIAL_STATE = {
  hidden: true
};
// como es habitual, se le asigna un initial state, si no se le pasa ningun state.
const cartReducer = (state = INITIAL_STATE,action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
// como va a ser toggle, no hace falta pasarle ningun parametro ni payload para modificar el state. se hará con un !state.
      return {
        ...state,
        hidden:!state.hidden
      }
    default:
      return state;
  }
};

export default cartReducer;