import { createSelector } from 'reselect';
//memoize genera un array en el cual se encuentran valores a los cuales se puede acceder de una forma mas directa, y no hace falta que se toque el resto del objeto state en el store. Se generan selectores del state, y el resto del state no se toca, y así no se actualizará, ni generará renders automáticos al actualizar una parte del state que no hace falta.
// esta primera función simplemente devuelve una pequeña posición del state guardado en el store, devuelve solo cart
const selectCart = state => state.cart;

// necesitamos este primer selectCart porque se le pasará a la primera vez que vamos a utilizar createSelector

//create Selector recoge dos argumentos, primero un array con todas las colecciones de los input selectors (en este caso state.cart)
// el segndo valor es una función en la que se encuentra el valor que queremos buscar en dicha colección pasada en el primer argumento
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

//hemos creado un selector que selecciona todos los CartItems que se encuentran en el state, y en la propiedad cart, y el resto no los toca.
//si queremos ahora hacer ahora algun procedimiento o función, que sólo necesite cartItems como parametros, se puede coger este selectCartItems, sin necesidad de coger nada mas.

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) => 
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);