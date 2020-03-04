import { createStore, applyMiddleware } from 'redux';
//middleware son funciones que se ejecutan cuando se recoge un action. Es un paso previo al reducer.
import { persistStore } from 'redux-persist';
//vamos a importar persistStore, para poder almacenar el state/store en una variable local o de Session, y para que cuando se refresque la página web, no se nos vaya los datos que hay en el state en ese momento. redux-persist nos permite utilizar estas funciones de localStore y sessionStore, nativas de javascript

import logger from 'redux-logger';
//logger será donde se almacene el middleware
//import thunk from 'redux-thunk'; quitamos thunk middleware, porque se hará con sagas. Thunk intercepta si el action tiene una función.
//thunk es un pedazo de middleware, que hemos incluido esta libreria haciendo yarn add redux-thunk, nos permite introducir funciones en en las actions.
import createSagaMiddleware from 'redux-saga';
// se importa saga, y se incluye en el middleware. saga es capaz de interceptar que action se pasa al reducer, y procede a hacer diferentes acciones según este action es captado.
//importamos los sagas del root-saga.
import rootSaga from './root-saga';

import rootReducer from './root-reducer';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];
//se pone dentro del array middleware thunk, y ya funciona thunk.

// middlewares se declara un array vacio. Si la aplicación se encuentra en modo development, eso quiere decir que se está ejecutando desde el servidor 3000 en modo local, entonces el middleware se rellenará con el logger, y entonces se verá como cambia el state en la consola. Si está en modo production, eso quiere decir, que está en la red, publicada la aplicación en heroku, entonces el logger no se rellenará, y no se verá en la consola esta información del state y del middleware
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
//persistor es una variante persistente de nuestro store, que permanecerá guardada en localStore
sagaMiddleware.run(rootSaga); // con este comando, ejecutamos los sagas que hay en otros archivos, y el middleware los sabe interpretar e interceptar.

export const persistor = persistStore(store);

//export default { store, persistor };

//este store hay que pasarlo a Provider (componente que envuelve toda la aplicación), que está en index.js

