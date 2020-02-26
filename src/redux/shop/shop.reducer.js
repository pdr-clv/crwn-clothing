// import SHOP_DATA from './shop.data'; desde que los datos se guardan en backend, en firebase, ya no hace falta este archivo.

import ShopActionTypes from './shop.types';

const INITIAL_STATE = {
//  collections: SHOP_DATA ya no hace falta el inicial state a SHOP_DATA, porque no existe el archivo. se inicializa a null.
  collections:null
}

const shopReducer = (state=INITIAL_STATE, action) =>{
  switch (action.type) {
    case ShopActionTypes.UPDATE_COLLECTIONS:
      return {
        ...state,
        collections:action.payload
      };
    default: 
      return state;
  }
};

export default shopReducer;