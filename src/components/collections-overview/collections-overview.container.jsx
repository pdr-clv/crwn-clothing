// es un componente de orden superior, es el contenedor que envolverá todo el componente collections-overview, y se obtendrá las propiedades del state para cargarlas como props al componente, y no hará falta hacerlo en el componente shop.component.
import { connect } from 'react-redux';
import { compose } from 'redux';// permite componer sucesiones de funciones y componentes de orden superior, y se ven de una forma mas clara.

import { createStructuredSelector } from 'reselect'; // para seleccionar y vincular los valores del state de redux.
import { selectIsCollectionFetching} from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
//a su vez WithSpinner es otro componente de orden superior, haremos un doble componente de orden superior, pero es completamente válido.
import CollectionsOverview from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching
});

// es perfectamente válido concatenar componentes y funciones como a continuación, pero para que sea mas fácil ver las funciones y componentes concatenadas se utiliza 
//const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview));

const CollectionsOverviewContainer = compose (
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;