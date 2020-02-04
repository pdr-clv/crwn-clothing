export const addItemToCart = (cartItems,cartItemToAdd) => {
// esta función devuelve un nuevo array, añadiendo la cantidad que hay de items, si el item que se va a añadir está repetido, y si no, te añade cantidad 1.
//primero comprobamos si existe un id identico de item en el array cartItems que hay en en store  
  const existingCartItem = cartItems.find(
      cartItem => cartItem.id === cartItemToAdd.id
    );
// si existe un CartItem identico (existingCartItem = true), se mapea el array existente en el store, esto devolverá un array nuevo, condición necesaria, y la cantidad se aumentará en uno, donde coincida el id del item que hay en el store, con el que se va añadir (itemToAdd)
  if (existingCartItem) {
    return cartItems.map(cartItem=>
      cartItem.id === cartItemToAdd.id
      ?
      { ...cartItem , quantity: cartItem.quantity + 1 }
      :
      cartItem
    )
  } else {
// este return, lo que hace es hacer un push a todos los cartItems con lo que está detrás de la coma. Si se pasara un cartitems null, o que no estuviera, se añadería la propiedad quantity = 1. De esta manera siempre vamos a tener quantity en todas los cartItems que haya en el store.
// importante, para que funcione el push, poner [...cartitems], no olvidar los 3 puntitos ...
    return [...cartItems, { ...cartItemToAdd , quantity:1 }]
  }
}