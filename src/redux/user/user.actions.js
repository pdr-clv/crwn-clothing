//aquí vamos a tener las actions que son los disparadores de cambio de estado, llamada a middleware, reducers y cambio en store y state
//son solo funciones que devuelven objetos con type of action, and payload.

import UserActionTypes from './user.types';

export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START
});
export const signInSuccess = user => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload : user
});
export const signInFailure = err => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload : err
});
export const emailSignInStart = (emailAndPassword) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword
});
//este action comprobará si hay un usuario logueado.
export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START
});

export const signOutSucess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = err => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: err
});


