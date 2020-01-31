import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

class SignIn extends React.Component {
	constructor(props) {
		super(props);

		this.state={
			email:'',
			password:''
		}
	}

	handleSubmit = event => {
//importante prevenir del comportamiento por defecto al hacer submit.
		event.preventDefault();

		this.setState({email:'',password:''});

	}

	handleChange = event => {
		const {name,value} = event.target;
// si ponemos name entre [] asignará el valor de la propiedad name del input (password o email) al valor value del input.
		this.setState({[name]:value});
	}

	render() {
		return(
			<div className='sign-in'>
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
					<div className='buttons'>
						<CustomButton type='submit'>Sign In</CustomButton>
						<CustomButton onClick={signInWithGoogle} isGoogleSignIn>
							Sign In with Google
						</CustomButton>
					</div>
				</form>
			</div>
		)
	}
}

export default SignIn;