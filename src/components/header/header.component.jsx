import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo} from '../../assets/corona.svg';

import './header.styles.scss';

const Header = ({ currentUser }) => (
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
		</div>
	</div>
);


//esta función es conveniente llamarla siempre igual. state es el argumento, el currentUser será state.user(que está en el root-reducer).currentUser(que está en el user-reducer)
const mapStateToProps = state => ({
	currentUser: state.user.currentUser
});
//connect es una función de orden superior de la libreria react-redux, que se le puede pasar el componente Header, y obtiene otro componente nuevo.
//connect es la función que nos ayudará a acceder al estado en el store con ayuda del reducer.
// mapStateToProps coge el estado que está en root-reducer, y se accede a user de root-reducer, y después a currentUser que está en el user.reducer.
// con este mapStateToProps podemos acceder al valor currentUser, y es el que se pasará como argumento a la propiedad currentUser a <Header currentUser={currentUser}</> 
export default connect(mapStateToProps)(Header);