// aquí está el objeto que tiene toda la base de los reducers de los states de la aplicación.
// traeremos el código de varias secciones individuales, y se centralizará aquí.
// root reducer tiene todos los reducers, hay que importar combineRedux para combinarlos todos en el root-reducer.
//import { combineRedux, combineReducers } from 'redux'; // como sale un error siempre de combineRedux no se utiliza, cambio el import, y no incluyo en combineRedux
import { combineReducers } from 'redux';
// importamos nuestro persistReducer desde redux-persist porque a parte de hacer persistente nuestro store, también queremos hacer persistente el reducer, para poder utilizar las variantes del reducer que permanezcan almacenadas en localStore
import { persistReducer } from 'redux-persist'; 
//importamos storage desde redux .... el tipo de store que queremos importar desde nuestro localStorage from our windowsBrowser
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

//ahora que tenemos el store de nuestro localstore del navegador or browser, tenemos que definir el nuevo config de nuestro persistor
// key porque está en root el state. storage, porque es el storage que está guardado en el localStorage del navegador, whitelist, porque queremos sólo que sea persistente cart, ya que user está guardado en Firebase, y no hace falta hacerlo persistente.
const persistConfig = {
  key:'root',
  storage,
  whitelist: ['cart']
}
// el reducer cart es el único que queremos que persista por eso se añade al whitelist, ya que user persiste gracias a que está en Firebase
//definimos nuestro rootReducer

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
}); 

// exportamos con persistReducer el rootReducer, con nuestra configuración de persisConfig.
export default persistReducer(persistConfig,rootReducer);

/* // forma primitiva, ahora definimos nuestro rootReducer, y lo hacemos persistente.
export default combineReducers({
  user: userReducer,
  cart: cartReducer
}); */
