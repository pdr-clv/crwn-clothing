import React, { useEffect } from 'react';
// para no tener un componente de clase, y solo utilizar componentDidMount, es mejor utilizar useEffects de Hooks, y el componente será funcional.
//capitulo 67: propiedades match,location y history. Muy interesante para ver como dirigirse a las rutas y url, utilizando history, :id, etc.
import { Route,Switch,Redirect } from 'react-router-dom';
//El componente Redirect vale para hacer redirect si se cumple alguna condición en la ruta de la url.
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors'; 

// Route permite que se pueda hacer paginacion e ir a los /algo.
//Switch se encarga de que en cuanto coincida una, ya no busque mas /algo
import HomePage from './pages/homepage/homepage.component';

import CheckoutPage from './pages/checkout/checkout.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
//import { auth, createUserProfileDocument} from './firebase/firebase.utils';
// se importa setCurrentUser, el action que obtendrá el CurrentUser el store, que está en el user.reducer y root-reducer. Se utilizará esta función en el dispatch (envio de currentUser como Props)
import { checkUserSession } from './redux/user/user.actions';

import './App.css';


const App = ({ checkUserSession, currentUser }) => {

  useEffect(()=>{
    checkUserSession()
  }, [checkUserSession]);
//para que no se esté cargando cada vez que haya una modificación de usuario, se pasa el segundo argumento a useEffect.
//como no hay componente de nivel mas alto de App, podemos poner dentro del segundo parametro el array checkUserSession, y sólo hará el useEffect cada vez que haya un checkUsersession, que eso sólo sucederá cuando se cargue el componente App, y nada mas.
//si pasamos este componente de clase a funcional, gracias a Hooks, no hará falta constructor ni nada mas.  
//no necesitamos mas el constructor, porque el estado se guarddará en el root-reducer y el store del state
  /*constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }*/

/* no necesitamos componentDidMount, lo haremos con useEffect de Hooks.
  componentDidMount(){
// cuando se monta el componente, se carga App, y se mirará a ver si hay un usuario logueado. 
// se pasará a user Saga el evento checkUserSession, y el saga lo interceptará, y dirigirá la actividad para dejar el usuari logueado, si existiria, o para no hacer nada, si no hubiera usuario logueado.

    const { checkUserSession } = this.props;

    checkUserSession()
    
//hacemos una desestructuración de setCurrentUser de this.props.
//    const {setCurrentUser} = this.props;

  /*  this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        
        userRef.onSnapshot(snapShot =>{
// se reemplaza el this.setState por setCurrentUser
/*          this.setState({
            currentUser:{
              id:snapShot.id,
              ...snapShot.data()
            }
          }) 
          setCurrentUser({
            id:snapShot.id,
            ...snapShot.data()
          })
        });
      } else {
        //this.setState({currentUser:userAuth});
// ya no hace falta hacer this.setState, y el currentUser: se le pasa directamente el objeto userAuth.
        setCurrentUser(userAuth);
      } 
// hemos utilizado esta función para añadir la colección 'collections' a nuestro firebase. se ha pasado un collectionsArray que se ha cargado desde el selector, y se ha hecho un map y una desectructuración de title e item, que eran los únicos objetos que queriamos poner en el firebase.
// hemos pasado unicamente title e items, puesto que route o id, se calcularán id y route cuando carguemos la información desde backend al store de redux
//      addCollectionAndDocuments('collections',collectionsArray.map(({title,items})=>({title,items})));
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }*/
// para que funcione Swtich, hay que envolver Route
//Route necesita los parametros exact (tiene que ser exacto el /),path, que es la ruta que estará ingresada en el url, y component que es el componente (que normalmente será una página creada por nosotros, que se cargará)
// no hace falta hacer render, sólo return, ya que se pasa a componente funcional gracias a Hooks.
//  render(){
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/signin' render={() => currentUser ? (<Redirect to ='/'/>) : (<SignInAndSignUpPage />)} />
      </Switch>
    </div>
  );
//  }
}
// el path de shop no se pone exact, porque eventualmente se pasará parametros al url /shop/idproducto.
//render dentro de Route te permite renderizar la página SigInAndSignOut si se cumple una condición del currentUser es null
//cuando llamamos a mapStateToProps, disgregamos user del state. al ser App componente de clase, para utilizar el valor currentUser, hay que hacer this.props.currentUser
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

// podemos pasar el valor currentUser que está guardado en el root-reducer o el store del state. Lo podemos utilizar haciendo this.props.currentUser

//checkUserSession se comprobará en componentDidMount para saber si hay un usuario logueado o o no.
const mapDispatchToProps = dispatch =>({
  checkUserSession: () => dispatch(checkUserSession())
});
//con mapDispatchToProps se enviará el cambio de estado registrado con setCurrentUser al rootReducer, a través del action. Con esto evitaremos tener que guardar el state en this.state, ya que se guardará en el rootreducer, y el evento this.setState.setCurrentUser se cambiará a this.props.SetCurrentUser (App es componente de clase, y se tiene que poner this.props antes de SetCurrentUser) que se encuentra en el action, y se pasa al reducer.
//haciendo esto. setCurrentUser es una función que asigna el usuario al state, se puede utilizar haciendo this.props.setCurrentUser.
export default connect(mapStateToProps,mapDispatchToProps)(App);
