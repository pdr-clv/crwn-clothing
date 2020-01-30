import React from 'react';
//capitulo 67: propiedades match,location y history. Muy interesante para ver como dirigirse a las rutas y url, utilizando history, :id, etc.
import { Route,Switch } from 'react-router-dom';

// Route permite que se pueda hacer paginacion e ir a los /algo.
//Switch se encarga de que en cuanto coincida una, ya no busque mas /algo
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth } from './firebase/firebase.utils';

import './App.css';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }
// para que funcione Swtich, hay que envolver Route
//Route necesita los parametros exact (tiene que ser exacto el /),path, que es la ruta que estará ingresada en el url, y component que es el componente (que normalmente será una página creada por nosotros, que se cargará)
  unsubscribeFromAuth = null

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user =>{
      this.setState({currentUser: user});
      console.log(user);
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
