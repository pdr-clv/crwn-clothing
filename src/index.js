import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom';

import './index.css';
import App from './App';

ReactDOM.render(
// hay que envolver a App con BrowserRouter para que funciones la "paginacion" o el routing
	<BrowserRouter>	
		<App />
	</BrowserRouter>
		
	, document.getElementById('root'));

