import React from 'react';
import { connect } from 'react-redux';
import { selectCollection} from '../../redux/shop/shop.selectors';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { 
  CollectionItemsContainer,
  CollectionTitle,
  CollectionPageContainer
  } from './collection.styles';

const CollectionPage = ({ collection }) =>{
// desestructuramos el collection recibido del state en item y en title para renderizarlos después con mas facilidad.
  const { title, items } = collection;
  return (
  <CollectionPageContainer>
    <CollectionTitle>{title}</CollectionTitle>
      <CollectionItemsContainer>
      {items.map(item=>
        (<CollectionItem key={item.id} item={item}/>)
      )}
      </CollectionItemsContainer>
  </CollectionPageContainer>
)};

//aquí vamos a utilizar el segundo parametro de la función mapStateToProps. No vamos a utilizar el createStructureSelector el primero va a ser el state, el segundo, las otras propiedades que tiene el componente collection, que está la información que se le pasa en el match por el enrutamiento.
const mapStateToProps = (state,ownProps) => ({
  collection:selectCollection(ownProps.match.params.collectionId)(state)
});
// esta funcion mapStateToProps es especial en este caso porque es necesario en este selector pasar el state dependiendo de la url que existe en la información de la propiedad match
export default connect(mapStateToProps)(CollectionPage);
