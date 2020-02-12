import { createStore, applyMiddleware } from 'redux';
//middleware son funciones que se ejecutan cuando se recoge un action. Es un paso previo al reducer.
import { persistStore } from 'redux-persist';
//vamos a importar persistStore, para poder almacenar el state/store en una variable local o de Session, y para que cuando se refresque la página web, no se nos vaya los datos que hay en el state en ese momento. redux-persist nos permite utilizar estas funciones de localStore y sessionStore, nativas de javascript

import logger from 'redux-logger';
//logger será donde se almacene el middleware
import rootReducer from './root-reducer';

const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
//persistor es una variante persistente de nuestro store, que permanecerá guardada en localStore
export const persistor = persistStore(store);

//export default { store, persistor };

//este store hay que pasarlo a Provider (componente que envuelve toda la aplicación), que está en index.js

