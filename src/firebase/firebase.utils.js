import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyC8jajl6VngHSsqroaGiCsmNGC53-7e00M",
  authDomain: "crwn-db-71e6c.firebaseapp.com",
  databaseURL: "https://crwn-db-71e6c.firebaseio.com",
  projectId: "crwn-db-71e6c",
  storageBucket: "crwn-db-71e6c.appspot.com",
  messagingSenderId: "171761656914",
  appId: "1:171761656914:web:d33aefd03fa33a9cf2eb8b",
  measurementId: "G-6NMMPF19ST"
};

export const createUserProfileDocument = async (userAuth,additionalData) => {
// si el usuario no está logeado o sign ineado, return, y no se sigue ejecutando nada mas.
  if (!userAuth) return;
// se le pasa el valor userAuth.uid como valor del documento, para ver si exite ese userRef, y se comprobará si existe ese uid en la colección users,  
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  
  const snapShot= await userRef.get();
// snapShot tiene datos, y existe la propiedad exists es falso, se ejecutará el códdigo que hay dentro del if.
  if (!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (err) {
      console.error('error creando usuario',err.message);
    }
  }

  return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt:'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;