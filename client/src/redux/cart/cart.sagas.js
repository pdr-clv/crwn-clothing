import { takeLatest, call, put, all, select} from 'redux-saga/effects';
//se importa select, para que se pueda hacer llamadas al selector del state-redux. Para obtener el user logeado y los cartsItems en el redux.

import UserActionTypes from '../user/user.types';
import CartActionTypes from './cart.types';

import { getUserCartRef } from '../../firebase/firebase.utils';
//getUserCartRef es para obtener los items que tiene guardado en el carrito el usuario, guardados en Firebase.
import { clearCart, setCartFromFirebase } from './cart.actions';
//se importan los selectors de current user y cartItems del state de redux.
import { selectCurrentUser } from '../user/user.selectors';
import { selectCartItems } from './cart.selectors';

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* checkCartFromFirebase({payload:user}) {
// se recibe en el payload el user, y se pasa a getUserCartRef, y se hace un snapshot haciendo get(), y el resultado es un data(), en el cual el objeto items tiene todos los cartiems que se van a pasar al state, mediante el cartaction updatecartfromFirebase
  const cartRef = yield call(getUserCartRef,user.id);
  const cartSnapshot = yield cartRef.get();
  yield put(setCartFromFirebase(cartSnapshot.data().cartItems));
}

export function* updateCartInFirebase() {
  const currentUser = yield select(selectCurrentUser);
  if (currentUser) {
    try {
//solo se pasa el currentUser.id a getUserCartRef, y nos devuelve el cartRef (o documento al cual se la añadirá  el userId y los items que hay en el cartitem del state-redux, por cada item, será un elemento de un array
//nos devuelve el doc, donde existe el UsedId, y se hará un update de cartItems unicamente utilizando un update.
      const cartRef = yield call(getUserCartRef,currentUser.id);
      const cartItems = yield select(selectCartItems);
//como se ha mencionado anteriormente, se hace un update del elemento cartItems que existe dentro de este documento.
      yield cartRef.update({cartItems});
    } catch (err){
      console.log(err);
    }
  }
}

//listener o disparador, que cada vez que el usuario haga sign_in, se compruebe que items hay en Firebase, y los cargue al state de redux
export function* onUserSignIn() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS,checkCartFromFirebase);
}
//listener para que cada vez que haya un cambio de items en el state de redux, actualice en Firebase la base de datos de los articulos guardados en firebase. 
export function* onCartChange() {
  yield takeLatest([
    CartActionTypes.REMOVE_ITEM,
    CartActionTypes.ADD_ITEM,
    CartActionTypes.CLEAR_ITEM_FROM_CART
  ]
    ,updateCartInFirebase);
}


export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut )
}

export function* cartSagas() {
  yield all([
    call(onSignOutSuccess),
    call(onCartChange),
    call(onUserSignIn)
  ]);
}