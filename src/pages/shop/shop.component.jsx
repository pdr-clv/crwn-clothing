import React from 'react';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';

import CollectionPage from '../collection/collection.component';

//ahora que shopPage está completamente desligado de props. Vamos a enrutarla, y añadirle rutas. 

import { Route } from 'react-router-dom';


/*  // forma primitiva, se llamaba así antes de incluir el listado shop en el state/store
class ShopPage extends React.Component{
	constructor (props){
		super(props);

		this.state = {collections:SHOP_DATA}
	}

	render(){
		//console.log(this.state); vemos que cargar this.state correctamente.
		// se pasa el valor this.state la variable {collections} brakets porque es objeto (D-structuring) a una variable collections, y se procesará cuando se llame al componente CollectionsPreview 
		const {collections} = this.state;
		return (<div className='shop-page'>
			{collections.map(({id , ...otherCollectionsProps})=>(
				<CollectionPreview key={id} {...otherCollectionsProps} />
			))}	
		</div>);
	}
} */

// tenemos acceso a las propiedades match, porque viene de una página enroutada de Página principal.
// match.path tiene la información de la ruta donde está la página, y no hace falta escribirla manualmente. Así este componente es movible.
const ShopPage = ({ match }) => (
	<div className='shop-page'>
		<Route exact path={`${match.path}`} component={CollectionsOverview} />
		<Route path={`${match.path}/:collectionId`} component={CollectionPage} />

	</div>
);


export default ShopPage;