//aquí vamos a escribir toda la información del state relacionada con el usuario, y después se pasará a root-reducer.
// es una función que recibe dos parametros, state inicial y el action (que es un objeto).
import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  currentUser: null
}

// se pasa el valor inicial al  state null, es como dar estructura de lo que será el state, y se inicia a cero o null en este caso. Parecido a como cuando se renderiza App, y cuando se monta, se le pasa el valor de User de auth. cuando se hace Login
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
// usando UserActionTypes, nos aseguramos de no cometer un error pasando el SET_CURRENT_USER sin errores de escritura.
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser:action.payload
      }
    default:
      return state;
  } 
}

export default userReducer;