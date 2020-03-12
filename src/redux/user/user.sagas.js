import {takeLatest, put, all, call } from 'redux-saga/effects';

import { googleProvider, 
  auth, 
  createUserProfileDocument,
  getCurrentUser} from '../../firebase/firebase.utils';

import UserActionTypes from './user.types';

import { 
  signInSuccess, 
  signInFailure,
  signOutSucess,
  signOutFailure
} from './user.actions';

export function* getUserAuthFromUserAuth(userAuth){
  try{
    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSnapShot = yield userRef.get();
//    console.log(userSnapShot);
    yield put (signInSuccess({id:userSnapShot.id, ...userSnapShot.data()}));
  } catch(err){
    put(signInFailure(err));
  }
}

//cuando se hace yield en onEmailSignInStart, se captura toda la action, y se tiene acceso como parametro al payload en este función de a continuación.
export function* signInWithEmail({payload:{ email, password }}){
  try{
//    const userRef= yield auth.signInWithEmailAndPassword(googleProvider);
// lo desestructuramos el objeto userRef, y cogemos la propiedad user
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getUserAuthFromUserAuth(user);
  } catch(err){
    put(signInFailure(err));
  }
}

export function* signInWithGoogle(){
  try{
//    const userRef= yield auth.signInWithPopup(googleProvider);
// lo desestructuramos el objeto userRef, y cogemos la propiedad user
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getUserAuthFromUserAuth(user);
  } catch(err){
    yield put (signInFailure(err));
  }
}

export function* isUserAuthenticated () {
// crearemos una nueva utilidad de firebase, para comprobar si hay un usuario cargado, y si lo hay, lo cargamos al state, pero haremos unsubscribe, para no tenerlo ocupando memoria. sólo interesa captar cual es, y cargarlo al state.currentUser
  try{
    const userAuth= yield getCurrentUser();
    if (!userAuth) return;
    yield getUserAuthFromUserAuth(userAuth);
  } catch(err){
    yield put(signInFailure(err))
  }
}

export function* signOutUser () {
  try{
    yield auth.signOut();
    yield put(signOutSucess());
  } catch(err){
    yield put(signOutFailure(err));
  }
}

export function* onSignOutStart () {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOutUser);
}

export function* onCheckUserSession () {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onEmailSignInStart(){
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onGoogleSignInStart(){
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* userSagas(){
  yield all([call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(isUserAuthenticated),
    call(onSignOutStart)
  ]);
}
