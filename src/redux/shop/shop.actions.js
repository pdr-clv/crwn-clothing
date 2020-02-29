import ShopActionTypes from './shop.types';

import { firestore,convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});
//esta action no tiene payload. Sólo cambia el stado de redux a isloading.

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload:collectionsMap
});

export const fetchCollectionsFailure = errorMsg => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload:errorMsg
})

//thunk es un actioncreator que nos devuelve una función dispatch en las acciones, y el resultado seguira siendo un objeto
//en vez de crear un action que devuelve un objeto, vamos a crear una acción que devolverá una función que haremos dispatch, y el dispatch será llamado en varias acciones.
export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionRef=firestore.collection('collections');
//aquí el truco es enviar en el dispatch fetchCollectionsStart, y así isLoading se cambiará a true. Gracias a que existe thunk.
    dispatch(fetchCollectionsStart());
    // onSnapshot es una subscripción al backend, propia de firebase, es un listener, que cada vez que hay un Snapshot, ejecuta el código que hay dentro de la función, podemos hacer una subscripción nativa, no propia de firebase con un Collection.set().then(ejecutar la función aquí) "porque es una promesa ponemos then", pero no será un listener, sólo se ejecutará una vez, cuando se haga montaje del componente. Lo dejaremos en la segunda opción, la subscripción de onSnapshot la dejo comentada.

    //			collectionRef.onSnapshot(async snapshot => {
        collectionRef.get().then( snapshot => {	
          const collectionToMap= convertCollectionsSnapshotToMap(snapshot);
    // console.log(collectionToMap); para comprobar que es el objeto correcto que queremos guradar en redux, ahora vamos a ver como lo guardamos. Generaremos un action, y después haremos un dispatch a redux.
          //updateCollections(collectionToMap);
    //cuando ya se ha cargado la información de firebase, y se ha pasado a redux la información del state, ya sabemos que el estado loading se puede poner a false, y se puede renderizar toda la página.
          dispatch(fetchCollectionsSuccess(collectionToMap));
        }).catch(err => dispatch(fetchCollectionsFailure(err.message)));
  }
}



