import React from 'react';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';

import CollectionPage from '../collection/collection.component';
//hará falta firestore para poder conectarse a firebase.
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
//importamos la acción del shop redux updateCollections, que cargará en el redux las colleciones cargadas desde firebase. También importaremos connect, y así podremos hacer dispatch a redux
import { updateCollections } from '../../redux/shop/shop.actions';
import { connect } from 'react-redux';
//ahora que shopPage está completamente desligado de props. Vamos a enrutarla, y añadirle rutas. 

import { Route } from 'react-router-dom';
// importamos WithSpinner para envolver los componentes CollectionsOverview y CollectionsPage, hasta que se haya cargado el redux con los datos de firebase.
import WithSpinner from '../../components/with-spinner/with-spinner.component';


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

// creamos dos componentes que son simplemente collecionOverview y colletionPage, pero se envuelven en withSpinner, y así, según sea el state loading o no, se utilizará un componente withSpinner, o el componente normal.
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
//se puede incluir en el reducer, de moment lo ponemos aquí, ya que sólo lo vamos a utlizar aquí de momento el estado loading.
//forma corta.
	state={
		loading:true
	};
// cuando cargamos la aplicación, collections en redux necesita tiempo para cargar, y en ese periodo de tiempo, al cargar esta página, encuentra el error que la collection no está cargada, y el valor de collection es null, y nos da error.
//tenemos que envolver collectionsOverview y collectionsPage en un withSpinner. Se generará el state loading, y mientras esté en loading = true, se mostrará el spinner, y cuando sea false, se mostrará la página.
//aunque sea comprensible poner el WithSpinner en los componentes collections Overview y colletionsPage, se pondrá aquí, ya que es donde se carga la información de firebase, y se pasa a redux, y es donde se puede determinar si el estado loading es true o false.


// se hará fetch de la información de bakcend de collections en este componente, ya que es el componente padre de todos los hijos que utilizarán el redux del store del state collections.
// cuando el componente se monte, cargaremos desde el backend la información a redux.
// para empezar, se hace unsubscribe = null, para que cuando se desmonte el componente, rompa la conexión con el backend (con la referencia de firebase), y no ocupar memoria, ni que haya fuga de memoria "memory leak"
	unsubscribeFromSnapshot=null;

	componentDidMount(){
//hacemos desesctructuración del método generado por dispatch de añadir collecion a redux { updateCollections }=this.props;
		const { updateCollections }=this.props;
// cargaremos la colección de 'collections' que es la que tiene la información de de los objetos de collections, y se puede acceder a toda esa información haciendo docs.
		const collectionRef=firestore.collection('collections');
// onSnapshot es una subscripción al backend, propia de firebase, es un listener, que cada vez que hay un Snapshot, ejecuta el código que hay dentro de la función, podemos hacer una subscripción nativa, no propia de firebase con un Collection.set().then(ejecutar la función aquí) "porque es una promesa ponemos then", pero no será un listener, sólo se ejecutará una vez, cuando se haga montaje del componente. Lo dejaremos en la segunda opción, la subscripción de onSnapshot la dejo comentada.
//
//			collectionRef.onSnapshot(async snapshot => {
		collectionRef.get().then( snapshot => {	
			const collectionToMap= convertCollectionsSnapshotToMap(snapshot);
// console.log(collectionToMap); para comprobar que es el objeto correcto que queremos guradar en redux, ahora vamos a ver como lo guardamos. Generaremos un action, y después haremos un dispatch a redux.
			updateCollections(collectionToMap);
//cuando ya se ha cargado la información de firebase, y se ha pasado a redux la información del state, ya sabemos que el estado loading se puede poner a false, y se puede renderizar toda la página.
			this.setState({ loading:false });
		});
	}

	render(){
// tenemos acceso a las propiedades match, porque viene de una página enroutada de Página principal.
// match.path tiene la información de la ruta donde está la página, y no hace falta escribirla manualmente. Así este componente es movible.
// hcemos una desestructuración de match en this.props, para que sea mas entendible cuando lo llamemos mas adelante.
		const { match }=this.props;
		const { loading } = this.state;
		return (
			<div className='shop-page'>
				<Route exact path={`${match.path}`} render={ props => (<CollectionsOverviewWithSpinner isLoading={loading} {...props} />)} />
				<Route path={`${match.path}/:collectionId`} render={ props => (<CollectionPageWithSpinner isLoading={loading} {...props} />)} />
		
			</div>
		);
// inicialmente, antes de poner el spinner era simplemente poner component y el componente, ahora, con el spinner, se utiliza render, y es una función, que hay que pasarle los parametros match, para que puedan cargar el componente correcto collectionOverview o collectionPage
// <Route exact path={`${match.path}`} component={CollectionsOverview} />
// <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
	}
}

const mapDispatchToProps = dispatch =>({
	updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})
// ahora ya podemos utilizar el método updateCollections, haremos una desectructuración {updateCollections}=this.props
export default connect(null,mapDispatchToProps)(ShopPage);