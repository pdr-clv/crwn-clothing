import { createStore, applyMiddleware } from 'redux';
//middleware son funciones que se ejecutan cuando se recoge un action. Es un paso previo al reducer.
import logger from 'redux-logger';
//logger será donde se almacene el middleware
import rootReducer from './root-reducer';

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;

//este store hay que pasarlo a Provider (componente que envuelve toda la aplicación), que está en index.js

