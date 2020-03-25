import React from 'react';
import CollectionItem from '../collection-item/collection-item.component';


import { 
	CollectionPreviewContainer,
	PreviewContainer,
	TitleContainer
} from './collection-preview.styles';


const CollectionPreview = ({title, items}) => (
	<CollectionPreviewContainer>
		<TitleContainer>{title.toUpperCase()}</TitleContainer>
		<PreviewContainer>
			{//filter a solo los cuatro primeros items, y después se hace un mpa para que ponga el nombre de cada item
			//items.filter((item,idx)=> idx < 4).map(({id, ...otherItemsProps}) =>(
			//<CollectionItem key={id} {...otherItemsProps}/>
//al necesitar el item entero en el collection-item para enviarlo al state, se cambia la forma de pasar las props a cart-item. Hay que pasar el item entero, sin hace desestructuración.
				items.filter((item,idx)=> idx < 4).map(item =>(
				<CollectionItem key={item.id} item={item}/>
			))}
		</PreviewContainer>
	</CollectionPreviewContainer>
);

export default CollectionPreview;