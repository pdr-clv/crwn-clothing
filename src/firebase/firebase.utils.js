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

};

// creamos una nueva función o utilidad de firebase para poder importar datos desde un objeto Json a una colleción con sus documentos en firebase.
// si la función no tiene un await, no hace falta poner un async al generar la función delante de (collection,objectoToAdd)
export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
//creamos un batch, esto son transacciones, se pone dentro todo del batch, y al final se hace un commit, y nos aseguramos que se ejecuta el batch entero, y si algo falla, no se ejecuta nada.
  const batch = firestore.batch();
// para cada elemento del objeto a añadir, se hace un forEach.
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc(); // al dejar doc() vacio, nos genera un id aleatorio
    console.log(newDocRef);
//ahora que tenemos el documento creado dentro de la colección, vamos a añadir el documento a la colección.
//aquí utilizaremos el batch creado antes. Para añadir el documento, los parametros son la dupla (documento,objeto)
    batch.set(newDocRef,obj);
  });
// batch es una promesa, hay que poner await delante de la función batch, y la función global hay que llamarla async
  return await batch.commit();
};
// esta función nos permitirá transformar el objeto obtenido de firebase en un objeto adaptado para nuestro redux, que tenga route y que tenga id el objeto de redux.

export const convertCollectionsSnapshotToMap = (collections) =>{
//se creará una nueva colleción transformada, añadiendo route e id a title e items, que ya existe en cada documento
  const transformedCollection = collections.docs.map(doc=>{
//haciendo collections.docs obtenemos los documentos que hay en esa collection, y se hace un map para acceder doc a doc. En cada doc, se hace una desestructuración, y cogemos title e item, que es lo que necesitamos.
    const {title,items} = doc.data();
// al hacer .data() a un doc, obtenemos el objeto que hay dentro de ese doc.
    return {
// se utilizará el método endodeURI para que sea válido para enruta después en un URL
      routeName:encodeURI(title.toLowerCase()),
      id: doc.id,
// id no lo obtenemos en doc.data(), necesitamos obtenerlo desde el doc.id. Es el id de cada documento incluido en la colección 'collections'
      title,
      items
    }
  });

// para comprobar que el transfromedCollection es correcto  console.log(transformedCollection); pero esto es un array, no es el objeto que necesitamos que tenga los datos normalizados y sea fácil llamar desde el selector de redux
// ahora utilizando la función reduce, vamos a obtener el objeto que sea {hats: ..., sneackers:...., ....}
// transformedCollection.reduce se le pasa dos parametros, primero la función que tiene un accumulator, y segundo el valor inicial a cada iteración, que será un objeto vacio.

  return transformedCollection.reduce((accumulator,docCollection) => {
//la función con el accumulator hará que se cree un array, en la que los documentos de la colleción serán los elementos, y cada key de cada elemento será el title, que a su vez se pondrá el tolowerCase.
    accumulator[docCollection.title.toLowerCase()]=docCollection;
// devuelve este nuevo elemento del objeto, y así hasta hacer todos los elementos de la colleción.
    return accumulator;
  },{});

};


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt:'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;