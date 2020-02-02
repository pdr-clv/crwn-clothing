// aquí está el objeto que tiene toda la base de los reducers de los states de la aplicación.
// traeremos el código de varias secciones individuales, y se centralizará aquí.
// root reducer tiene todos los reducers, hay que importar combineRedux para combinarlos todos en el root-reducer.
import { combineRedux, combineReducers } from 'redux';

import userReducer from './user/user.reducer';

export default combineReducers({
  user: userReducer
});
