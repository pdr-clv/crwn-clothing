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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt:'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;