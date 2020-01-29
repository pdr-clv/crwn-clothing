import React from 'react';
import SHOP_DATA from './shop.data';

import CollectionPreview from '../../components/collection-preview/collection-preview.component';


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
}

export default ShopPage;