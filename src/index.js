import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom';
// para que funcione Redux tenemos que importar el componente Provider y envolver todo el renderizado de la aplicación y el BrowserRouter 
//Provider es el componente padre que envuelve a toda la aplicación, y gracias a ello tendremos a acceder al valor store del state en cualquier parte o componente de la aplicación
//hay que asignar la propiedad store a Provider, para que store del state sea accesible desde cualquier componente haciendo uso de la función de orden superior connect(maptoProps,dispatchtoProps)("Componente")
// hay que envolver a App con BrowserRouter para que funcione la "paginacion" o el routing
import { Provider } from 'react-redux';
import store from './redux/store';


import './index.css';
import App from './App';

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>	
			<App />
		</BrowserRouter>
	</Provider>
	, document.getElementById('root'));

