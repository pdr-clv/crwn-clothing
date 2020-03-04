import { takeLatest, call, put} from 'redux-saga/effects';
// importaremos efectos que nos permiten hacer cosas similares a yield en los generadores de funciones (function*)
//importamos los efectos takeEvery, take, takeLast para captar el action en el SAGA.
//importamos call, que es ejecutar un metodo dentro del SAGA, y no tener problemas de asincronía. En lugar de ejecutar una función asincrona directamente 'función', la ejecutamos con yield call(funcion)
//importamos put, es el efecto de Saga que permite hacer dispatch a un action.
// queremos dar funcionalidad que existe con thunk y las funciones que intercepta del archivo shop.actions.
import { firestore,convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
//importamos las funciones de firebase, para acceder a backend.
import ShopActionTypes from './shop.types';
//importamos las Actions, para que se puedan ejecutar dentro de los sagas, y se puedan pasar los payloads al reducer.
import { fetchCollectionsSuccess, fetchCollectionsFailure} from './shop.actions';

export function* fetchCollectionsAsync() {
  try{
    const collectionRef = firestore.collection('collections');
    const snapShot = yield collectionRef.get();
//    const collectionMap = convertCollectionsSnapshotToMap(SnapShot); // se podría hacer así perfectamente, pero se utilizará call. Un efecto de la librería Saga. Es mejor, por si acaso, la llamada tarda mas de lo normal, y así esperamos a que se cargue igualmente, haciendo un yield.
    const collectionMap = yield call(convertCollectionsSnapshotToMap, snapShot);
    yield put(fetchCollectionsSuccess(collectionMap));
  }catch (err){
    yield put(fetchCollectionsFailure(err));
  }
}
// la segunda función fetchCollectionAsync puede tener control de que ejecutar. Yield ejerce el poder de pausar, y poder determinar que hacer.
// la primera función, captará si el action es FETCH_COLLECTIONS_START. si existen mas sagas, en otros archivos, al ser asyncrono, no bloqueará la aplicación, y se podrán ejecutar todos a la vez. La segunda función generadora que se pasa como segundo parametro de take, también será una generación de función, que tiene funcionalidades similares a async/await
export function* fetchCollectionsStart() {
  yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}

//estos sagas serán exportados a un root-saga, y este a su vez, será exportado al store, mediante un import, se podrán configurar el middleware para que escuche las actions el saga.


