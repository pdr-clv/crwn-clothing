// import SHOP_DATA from './shop.data'; desde que los datos se guardan en backend, en firebase, ya no hace falta este archivo.

import ShopActionTypes from './shop.types';

const INITIAL_STATE = {
//  collections: SHOP_DATA ya no hace falta el inicial state a SHOP_DATA, porque no existe el archivo. se inicializa a null.
  collections:null,
  isFetching:false,
  errorMessage:undefined
//incluimos ahora la propiedad isFetching, para saber si está cargando información, o no.
}

const shopReducer = (state=INITIAL_STATE, action) =>{
  switch (action.type) {
    case ShopActionTypes.FETCH_COLLECTIONS_START:
      return {
        ...state,
        isFetching:true
      };
      case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetching:false,
        collections:action.payload
      };
    case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        isFetching:false,
        errorMessage:action.payload
      };
    default: 
      return state;
  }
};

export default shopReducer;