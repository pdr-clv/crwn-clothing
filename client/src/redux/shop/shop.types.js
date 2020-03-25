const ShopActionTypes = {
//  UPDATE_COLLECTIONS:'UPDATE_COLLECTIONS' // este era el unico tipo de shopaction que había, porque toda la actividad asincrona estaba en ShopPage, ahora la vamos a tener en las actions, ahora incluiremos otros nuevos
  FETCH_COLLECTIONS_START: 'FETCH_COLLECTIONS_START',
  FETCH_COLLECTIONS_SUCCESS: 'FETCH_COLLECTIONS_SUCCESS',
  FETCH_COLLECTIONS_FAILURE: 'FETCH_COLLECTIONS_FAILURE'
}


export default ShopActionTypes;
