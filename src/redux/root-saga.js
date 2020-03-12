import { all, call } from 'redux-saga/effects';
// con el efecto all, podemos ejectuar varios sagas a la vez asincronamente.
import { fetchCollectionsStart } from './shop/shop.sagas';
import { userSagas} from './user/user.sagas';
import { cartSagas } from './cart/cart.sagas';

export default function* rootSaga() {
  yield all([
    call(fetchCollectionsStart),
    call(userSagas),
    call(cartSagas)
  ]);
}