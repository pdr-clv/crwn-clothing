import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, createUserProfileDocument} from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
	constructor() {
		super();

		this.state = {
			displayName:'',
			email:'',
			password:'',
			confirmPassword:''
		}
	}

	handleSubmit = async event => {

		event.preventDefault();

		const {displayName, email, password, confirmPassword} = this.state;

		if (password !== confirmPassword) {
			alert("Password and Confirm Password don't match");
			return;
		}

		try{
// auth.createUserWithEmailAndPassword es un método de firebase, que te permite crear un nuevo usuario pasandole email and password.
			const {user} = await auth.createUserWithEmailAndPassword(email,password);
			await createUserProfileDocument(user,{displayName});
// con esto dejaremos los inputs limpios, después de guardar el usuario
			this.setState({
				displayName:'',
				email:'',
				password:'',
				confirmPassword:''
			});
		} catch (err){
			console.error('error creando usuario',err.message);
			alert('Error creating new user \n' + err.message);
		}
	};

	handleChange = event=> {
		const {name,value} = event.target;
// si ponemos name entre [] asignará el valor de la propiedad name del input (password o email) al valor value del input.
		this.setState({[name]:value});
	}


	render(){
// desectructuramos this.state en displayName, emai, password, etc, y se les pasa a los FormInput esos values
		const {displayName, email, password, confirmPassword} = this.state;
		return (
			<div className='sign-up'>	
				<h2 className='title'>I do not have an account</h2>
				<span>Register with your e-mail and password</span>
				<form className='sign-up-form' onSubmit={this.handleSubmit}>
					<FormInput 
						type='text'
						name='displayName'
						value={displayName}
						onChange={this.handleChange}
						label='Display Name'
						required />
						<FormInput 
						type='email'
						name='email'
						value={email}
						onChange={this.handleChange}
						label='E-mail'
						required />
						<FormInput 
						type='password'
						name='password'
						value={password}
						onChange={this.handleChange}
						label='Choose Password'
						required />
						<FormInput 
						type='password'
						name='confirmPassword'
						value={confirmPassword}
						onChange={this.handleChange}
						label='Confirm Password'
						required />
					<CustomButton type='submit'>SIGN UP</CustomButton>				
				</form>
			</div>
		)
	}
}

export default SignUp