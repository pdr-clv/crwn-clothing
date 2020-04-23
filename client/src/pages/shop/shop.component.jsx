import React, { useEffect, lazy, Suspense } from 'react';

//No harán falta los componentes CollectionsOverview, ni CollectionPage, y cargaremos los componentes de orden superior que los envuelve, y no hace falta cargar mapStateToProps. Ni hace connect.
//import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
//import CollectionPage from '../collection/collection.component';


//hará falta firestore para poder conectarse a firebase.
//import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'; // ya no hace falta al pasar la actividad asyncrona a redux con thunk
//importamos la acción del shop redux updateCollections, que cargará en el redux las colleciones cargadas desde firebase. También importaremos connect, y así podremos hacer dispatch a redux
//cuando existia Thunk, se llamaba a fetchCollectionStartAsync
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import { connect } from 'react-redux';

//ahora que shopPage está completamente desligado de props. Vamos a enrutarla, y añadirle rutas. 

import { Route } from 'react-router-dom';
//importamos Spinner para envolver el Suspense, y mientras está cargandose el Suspense por la función lazy, se vé el Spinner

import Spinner from '../../components/spinner/spinner.component';

//import CollectionPageContainer from '../collection/collection.container';
//import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
const CollectionsOverviewContainer = lazy(()=>import('../../components/collections-overview/collections-overview.container'));
const CollectionPageContainer = lazy(()=>import('../collection/collection.container'));
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
//const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
//const CollectionPageWithSpinner = WithSpinner(CollectionPage);
//se pasará a componente funcional gracias a useEffect y Hooks
//class ShopPage extends React.Component {
const ShopPage = ({ fetchCollectionsStart, match }) => {
//se puede incluir en el reducer, de moment lo ponemos aquí, ya que sólo lo vamos a utlizar aquí de momento el estado loading.
//forma corta.
//	state={loading:true}; // ya no hace falta el state, puesto que se ha pasado la actividad asincrona al redux gracias a thunk
// cuando cargamos la aplicación, collections en redux necesita tiempo para cargar, y en ese periodo de tiempo, al cargar esta página, encuentra el error que la collection no está cargada, y el valor de collection es null, y nos da error.
//tenemos que envolver collectionsOverview y collectionsPage en un withSpinner. Se generará el state loading, y mientras esté en loading = true, se mostrará el spinner, y cuando sea false, se mostrará la página.
//aunque sea comprensible poner el WithSpinner en los componentes collections Overview y colletionsPage, se pondrá aquí, ya que es donde se carga la información de firebase, y se pasa a redux, y es donde se puede determinar si el estado loading es true o false.

	useEffect(()=>{
		fetchCollectionsStart();
	},[fetchCollectionsStart]);
//se puede poner en el array fetchCollectionsStart, ya que no se va a modificar nada, sólo cuando se haga un mapDispatchtoProps
// se hará fetch de la información de bakcend de collections en este componente, ya que es el componente padre de todos los hijos que utilizarán el redux del store del state collections.
// cuando el componente se monte, cargaremos desde el backend la información a redux.
// para empezar, se hace unsubscribe = null, para que cuando se desmonte el componente, rompa la conexión con el backend (con la referencia de firebase), y no ocupar memoria, ni que haya fuga de memoria "memory leak"

//	unsubscribeFromSnapshot=null; //antes de estar la actividad asincrona en el redux, con thunk, se hacía de esta forma, ahora sólo se carga en component willmount con el selector de redux y suficiente, no hay que hacer unsubscribe.
/*
	componentDidMount(){
// tenemos que comenzar la actividad asincrona en el redux, enviandole fetchCollectionStartAsync()
//primer hace desesctructuración de las propiedades.
		fetchCollectionsStart();
	}*/

//	render(){
// tenemos acceso a las propiedades match, porque viene de una página enroutada de Página principal.
// match.path tiene la información de la ruta donde está la página, y no hace falta escribirla manualmente. Así este componente es movible.
// hcemos una desestructuración de match en this.props, para que sea mas entendible cuando lo llamemos mas adelante.
//		const { loading } = this.state; // esto es de cuando se hacia la actividad asincrona en este componente, y no en el redux, ahora nos lo proporciona el redux.
	return (
		<div className='shop-page'>
			<Suspense fallback={<Spinner/>}>
				<Route exact path={`${match.path}`} component = {CollectionsOverviewContainer} />
				<Route path={`${match.path}/:collectionId`} component = {CollectionPageContainer} />
			</Suspense>
		</div>
	);
// la proppiedad isloading para el withSpinner es perfecta para CollectionsOverview, pero no en CollectionPage no es del todo válida, porque puede ser que no esté cargando la página, pero el collection sea null, entonces, isLoadin, hay que pasarle un valor diferente de isCollectionFetching. Por ejemplo se le pasará isCollectionLoaded, entonces eso significa que no está Loading, y que además, no es null, tiene un valor.
// crearemos un selector del state de redux, el cual, cuando se haya cargado la propiedad collection desde backend, entonces nos devuelva un true como que la colección ya está cargada. Es diferente al selector de saber si la collección está haciendo fetching.
// inicialmente, antes de poner el spinner era simplemente poner component y el componente, ahora, con el spinner, se utiliza render, y es una función, que hay que pasarle los parametros match, para que puedan cargar el componente correcto collectionOverview o collectionPage
// <Route exact path={`${match.path}`} component={CollectionsOverview} />
// <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
//	}
}

//form primitiva, cuando hacía falta cargar las propiedades desde el state.Se va a comentar el código. Y se generará nuevos componentes de orden superior.
// estas propiedades que obtenemos del state, solo se pasan a los componentes CollectionsOverview, y CollectionPage, y según el valor que tiene, se hace el spinner o no, por lo tanto se creará un componente de orden superior, y entonces estas porpiedades se utilizarán únicamente en este componente de orden superior, y no necesitaremos crear un mapsStateToProps en la página shop.component.
/*const mapStateToProps = createStructuredSelector({
	isCollectionFetching: selectIsCollectionFetching,
	isCollectionLoaded:selectIsCollectionsLoaded
}) */

//se puede hacer también para el componente cart-dropdown.component

const mapDispatchToProps = dispatch =>({
	fetchCollectionsStart:() => dispatch(fetchCollectionsStart())
})
// ahora ya podemos utilizar el método updateCollections, haremos una desectructuración {updateCollections}=this.props
export default connect(null,mapDispatchToProps)(ShopPage);