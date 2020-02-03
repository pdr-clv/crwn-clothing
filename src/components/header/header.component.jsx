import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { ReactComponent as Logo} from '../../assets/corona.svg';

import './header.styles.scss';


const Header = ({ currentUser,hidden }) => (
	<div className='header'>
		<Link className='logo-container' to='/'>
			<Logo className='logo' />
		</Link>
		<div className='options'>
			<Link className='option' to='/shop'>
				SHOP
			</Link>
			<Link className='option' to='/shop'>
				CONTACT
			</Link>
			{
				currentUser ?
				<div className='option' onClick={()=>auth.signOut()}>SIGN OUT</div>
				:
				<Link className='option' to='/signin'>SIGN IN</Link>

			}
			<CartIcon />
		</div>
		{
			hidden ? null:(<CartDropdown />)
		}
	</div>
);
//si hidden es true, no se muestra nada, pero si es falso, se muestra el CartDropdown.

//esta función es conveniente llamarla siempre igual. state es el argumento, el currentUser será state.user(que está en el root-reducer).currentUser(que está en el user-reducer)

/*const mapStateToProps = state => ({
	currentUser: state.user.currentUser
});*/ // así es como se llamó la primera vez, cuando tienes que coger varias propiedades del state que hay en el store o en el root-reducer, se puede hacer desesctructuración.

const mapStateToProps = ({ user: {currentUser}, cart:{hidden}}) => ({
	currentUser,
	hidden
});

//connect es una función de orden superior de la libreria react-redux, que se le puede pasar el componente Header, y obtiene otro componente nuevo.
//connect es la función que nos ayudará a acceder al estado en el store con ayuda del reducer.
// mapStateToProps coge el estado que está en root-reducer, y se accede a user de root-reducer, y después a currentUser que está en el user.reducer.
// con este mapStateToProps podemos acceder al valor currentUser, y es el que se pasará como argumento a la propiedad currentUser a <Header currentUser={currentUser}</> 
export default connect(mapStateToProps)(Header);