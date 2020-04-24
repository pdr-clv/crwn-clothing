import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom';
// para que funcione Redux tenemos que importar el componente Provider y envolver todo el renderizado de la aplicación y el BrowserRouter 
//Provider es el componente padre que envuelve a toda la aplicación, y gracias a ello tendremos a acceder al valor store del state en cualquier parte o componente de la aplicación
//hay que asignar la propiedad store a Provider, para que store del state sea accesible desde cualquier componente haciendo uso de la función de orden superior connect(maptoProps,dispatchtoProps)("Componente")
// hay que envolver a App con BrowserRouter para que funcione la "paginacion" o el routing
import { Provider } from 'react-redux';
import { PersistGate} from 'redux-persist/integration/react';
// envolveremos el componente App con PersistGate para que pueda ser persistente el state.
//importamos todo del archivo serviceWorker, que existe en raiz, es el archivo que tendrá el serviceWorker para hacer nuestra aplicación PWA
import * as serviceWorker from './serviceWorker';
// forma primitiva , ahora hay que importar store and persitstore
//import store from './redux/store';

import { store, persistor } from './redux/store';



import './index.css';
import App from './App';

// se le pasa al PersistGate las propiedades del persistor declarado en store.

// persist detecta si hay algo en el state cuando se refresca el navegador. Si hay algo, cuando vuelve a cargar la página web, el state se quedará a cero, pero se disparará el action del persist, que hará que vuelva a cargar todo lo que había en el state, antes de refrescar el navegador
ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<PersistGate persistor={ persistor }>
				<App />
			</PersistGate>
		</BrowserRouter>
	</Provider>
	, document.getElementById('root'));
//con este script que hemos importado del archivo serviceWorker, hacemos nuestra aplicación PWA
serviceWorker.register();