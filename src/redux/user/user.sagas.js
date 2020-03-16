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
  signOutFailure,
  signUpSuccess,
  signUpFailure
} from './user.actions';

export function* getSnapShotFromUserAuth(userAuth,additionalData){
  try{
    const userRef = yield call(createUserProfileDocument, userAuth,additionalData);
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
    yield getSnapShotFromUserAuth(user);
  } catch(err){
    put(signInFailure(err));
  }
}

export function* signInWithGoogle(){
  try{
//    const userRef= yield auth.signInWithPopup(googleProvider);
// lo desestructuramos el objeto userRef, y cogemos la propiedad user
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapShotFromUserAuth(user);
  } catch(err){
    yield put (signInFailure(err));
  }
}

export function* isUserAuthenticated () {
// crearemos una nueva utilidad de firebase, para comprobar si hay un usuario cargado, y si lo hay, lo cargamos al state, pero haremos unsubscribe, para no tenerlo ocupando memoria. sólo interesa captar cual es, y cargarlo al state.currentUser
  try{
    const userAuth= yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapShotFromUserAuth(userAuth);
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
// esta función recibe userCredentials, que son displayName, email and Password, se hace una desestructuración de objeto.
//el payload se recibe cuando se ejecuta el action de SIGN_UP_START, y le llega a signUpUser. se desestructura el payload, porque se va a utilizar.
export function* signUpUser({payload:{ email, password, displayName }}) {
//  yield console.log(email,password,displayName)
  try{
    const {user} = yield auth.createUserWithEmailAndPassword(email,password);
//    console.log(user)
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
//tenemos que escuchar, a signUpSuccess, si hay SingUpSuccess, se captará en onSigUpSuccess
  } catch(err){
    yield put(signUpFailure(err));
  } 
}

export function* onSignUpStart () {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUpUser);
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
//el payload se recibe cuando se ejecuta el action de SIGN_UP_START, y le llega a signUpUser. se desestructura el payload, porque se va a utilizar.
export function* signInAfterSignUp({payload: {user,additionalData}}){
  yield getSnapShotFromUserAuth(user, additionalData);
}

export function* onsignUpSuccess() {
//escuchamos si hemos hecho signUpSuccess, y pasado payload al user-reducer.  
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas(){
  yield all([call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onsignUpSuccess)
  ]);
}
