// es un componente de orden superior, es el contenedor que envolverá todo el componente collections-overview, y se obtendrá las propiedades del state para cargarlas como props al componente, y no hará falta hacerlo en el componente shop.component.
import { connect } from 'react-redux';
import { compose } from 'redux';// permite componer sucesiones de funciones y componentes de orden superior, y se ven de una forma mas clara.

import { createStructuredSelector } from 'reselect'; // para seleccionar y vincular los valores del state de redux.
import { selectIsCollectionsLoaded} from '../../redux/shop/shop.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
//a su vez WithSpinner es otro componente de orden superior, haremos un doble componente de orden superior, pero es completamente válido.
import CollectionPage  from './collection.component';

const mapStateToProps = createStructuredSelector({
  isLoading: state => !selectIsCollectionsLoaded(state)
//no entiendo porque aquí, no se carga directamente el selector, se utiliza el state como parametro de función, y se pasa a selectIsCollectionsLoaded. Se tiene que invertir, porque aquí tiene que ser falsa la propiedad isLoading en WithSpinner.
});

// es perfectamente válido concatenar componentes y funciones como a continuación, pero para que sea mas fácil ver las funciones y componentes concatenadas se utiliza 
//const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview));

const CollectionPageContainer = compose (
  connect(mapStateToProps),
  WithSpinner
)(CollectionPage);

export default CollectionPageContainer;