import React from 'react';
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
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
// se importa setCurrentUser, el action que obtendrá el CurrentUser el store, que está en el user.reducer y root-reducer. Se utilizará esta función en el dispatch (envio de currentUser como Props)
import { setCurrentUser } from './redux/user/user.actions';

import './App.css';


class App extends React.Component {
  
//no necesitamos mas el constructor, porque el estado se guarddará en el root-reducer y el store del state
  /*constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }*/

  unsubscribeFromAuth = null

  componentDidMount(){
//hacemos una desestructuración de setCurrentUser de this.props.
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        
        userRef.onSnapshot(snapShot =>{
// se reemplaza el this.setState por setCurrentUser
/*          this.setState({
            currentUser:{
              id:snapShot.id,
              ...snapShot.data()
            }
          }) */
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
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
// para que funcione Swtich, hay que envolver Route
//Route necesita los parametros exact (tiene que ser exacto el /),path, que es la ruta que estará ingresada en el url, y component que es el componente (que normalmente será una página creada por nosotros, que se cargará)
  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to ='/'/>) : (<SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );
  }
}
// el path de shop no se pone exact, porque eventualmente se pasará parametros al url /shop/idproducto.
//render dentro de Route te permite renderizar la página SigInAndSignOut si se cumple una condición del currentUser es null
//cuando llamamos a mapStateToProps, disgregamos user del state. al ser App componente de clase, para utilizar el valor currentUser, hay que hacer this.props.currentUser
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});

// podemos pasar el valor currentUser que está guardado en el root-reducer o el store del state. Lo podemos utilizar haciendo this.props.currentUser

const mapDispatchToProps = dispatch =>({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
//con mapDispatchToProps se enviará el cambio de estado registrado con setCurrentUser al rootReducer, a través del action. Con esto evitaremos tener que guardar el state en this.state, ya que se guardará en el rootreducer, y el evento this.setState.setCurrentUser se cambiará a this.props.SetCurrentUser (App es componente de clase, y se tiene que poner this.props antes de SetCurrentUser) que se encuentra en el action, y se pasa al reducer.
//haciendo esto. setCurrentUser es una función que asigna el usuario al state, se puede utilizar haciendo this.props.setCurrentUser.
export default connect(mapStateToProps,mapDispatchToProps)(App);
