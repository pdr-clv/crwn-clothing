import { all, call } from 'redux-saga/effects';
// con el efecto all, podemos ejectuar varios sagas a la vez asincronamente.
import { fetchCollectionsStart } from './shop/shop.sagas';

export default function* rootSaga() {
  yield all([
    call(fetchCollectionsStart)
  ]);
}