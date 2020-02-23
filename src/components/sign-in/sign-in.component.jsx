import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import {
	SignInContainer,
	ButtonsContainer
} from './sign-in.styles';

class SignIn extends React.Component {
	constructor(props) {
		super(props);

		this.state={
			email:'',
			password:''
		}
	}

	handleSubmit = async event => {
//importante prevenir del comportamiento por defecto al hacer submit.
		event.preventDefault();

		const {email, password} = this.state;

		try {
			await auth.signInWithEmailAndPassword(email,password);
			alert('Success Signing In \nWelcome!');
// limpiamos los inputs.
			this.setState({email:'',password:''});	
		} catch (err) {
			console.error('Error logueando usuario',err.message);
			alert('Error logging in \n' + err.message);
		}

	}

	handleChange = event => {
		const {name,value} = event.target;
// si ponemos name entre [] asignará el valor de la propiedad name del input (password o email) al valor value del input.
		this.setState({[name]:value});
	}

	render() {
		return(
			<SignInContainer>
				<h2>I already have an account</h2>
				<span>Sign in with your e-mail and password</span>
				<form onSubmit={this.handleSubmit}>
					<FormInput name='email' type='email' 
					label='Email'
					onChange={this.handleChange}
					value ={this.state.email} required/>
					<FormInput name='password' type='password' 
					label='Password'
					onChange={this.handleChange}
					value ={this.state.password} required/>
					<ButtonsContainer>
						<CustomButton type='submit'>Sign In</CustomButton>
						<CustomButton onClick={signInWithGoogle} isGoogleSignIn>
							Sign In with Google
						</CustomButton>
					</ButtonsContainer>
				</form>
			</SignInContainer>
		)
	}
}

export default SignIn;