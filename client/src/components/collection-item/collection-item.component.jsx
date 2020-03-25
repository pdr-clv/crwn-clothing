import React from 'react';
import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';


import {
	CollectionItemContainer,
	BackgroundImage,
	AddButton,
	CollectionFooterContainer,
	NameContainer,
	PriceContainer
} from './collection-item.styles';

const CollectionItem = ({item, addItem}) => {
	const { name, price, imageUrl } = item;
	return (
	<CollectionItemContainer>
		<BackgroundImage imageUrl={imageUrl} />
		<CollectionFooterContainer>
			<NameContainer>{name}</NameContainer>
			<PriceContainer>{price}</PriceContainer>
		</CollectionFooterContainer>
		<AddButton className='custom-button' onClick={()=>addItem(item)} inverted>Add to cart</AddButton>

  </CollectionItemContainer>
)};

const mapDispatchToProps = dispatch =>({
	addItem:item => dispatch(addItem(item))
});
//ahora podemos utilizar la función addItem para enviar el item en el payload al estado cart.
export default connect(null,mapDispatchToProps)(CollectionItem);