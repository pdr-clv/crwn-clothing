import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';


import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';



import { ReactComponent as Logo} from '../../assets/corona.svg';

import { 
	HeaderContainer,
	LogoContainer,
	OptionsContainer,
	OptionLink
} from './header.styles';


const Header = ({ currentUser,hidden }) => (
	<HeaderContainer>
		<LogoContainer to='/'>
			<Logo className='logo' />
		</LogoContainer>
		<OptionsContainer>
			<OptionLink to='/shop'>
				SHOP
			</OptionLink>
			<OptionLink to='/shop'>
				CONTACT
			</OptionLink>
			{
				currentUser ?
				<OptionLink as='div' onClick={()=>auth.signOut()}>SIGN OUT</OptionLink>
				:
				<OptionLink to='/signin'>SIGN IN</OptionLink>

			}
			<CartIcon />
		</OptionsContainer>
		{
			hidden ? null:(<CartDropdown />)
		}
	</HeaderContainer>
);
//si hidden es true, no se muestra nada, pero si es falso, se muestra el CartDropdown.

//esta función es conveniente llamarla siempre igual. state es el argumento, el currentUser será state.user(que está en el root-reducer).currentUser(que está en el user-reducer)

/*const mapStateToProps = state => ({
	currentUser: state.user.currentUser
});*/ // así es como se llamó la primera vez, cuando tienes que coger varias propiedades del state que hay en el store o en el root-reducer, se puede hacer desesctructuración.

/* //Forma primitiva de llamar a mapStateToProps, antes de introducir los StateSelectors de memoized.
const mapStateToProps = ({ user: {currentUser}, cart:{hidden}}) => ({
	currentUser,
	hidden
}); */
/* // esta es la siguiente forma de hacerlo, pero para no escribir muchas lineas con currentUser, hidden, and muchos mas, utilizaremos createStructuredSelector
const mapStateToProps = state => ({
	currentUser: selectCurrentUser(state),
	hidden: selectCartHidden(state)
}); */

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	hidden: selectCartHidden
});



//connect es una función de orden superior de la libreria react-redux, que se le puede pasar el componente Header, y obtiene otro componente nuevo.
//connect es la función que nos ayudará a acceder al estado en el store con ayuda del reducer.
// mapStateToProps coge el estado que está en root-reducer, y se accede a user de root-reducer, y después a currentUser que está en el user.reducer.
// con este mapStateToProps podemos acceder al valor currentUser, y es el que se pasará como argumento a la propiedad currentUser a <Header currentUser={currentUser}</> 
export default connect(mapStateToProps)(Header);