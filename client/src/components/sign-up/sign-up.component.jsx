import React , {useState} from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { connect } from 'react-redux';

import { signUpStart } from '../../redux/user/user.actions';

//ahora ya no necesitamos utilizar la libreria auth de firebase aquí.
//import { auth, createUserProfileDocument} from '../../firebase/firebase.utils';

import { TitleForm, SignUpContainer} from './sign-up.styles';

const SignUp = ({ signUpStart }) => {
/*	constructor() {
		super();

		this.state = {
			displayName:'',
			email:'',
			password:'',
			confirmPassword:''
		}
	} */

	const [userCredentials,setCredentials] = useState({
		displayName:'',
		email:'',
		password:'',
		confirmPassword:''
	});

	const {displayName, email, password, confirmPassword} = userCredentials;

	const handleSubmit = async event => {

		event.preventDefault();
		

		if (password !== confirmPassword) {
			alert("Password and Confirm Password don't match");
			return;
		}
		signUpStart({displayName,email,password});
/*		this.setState({
			displayName:'',
			email:'',
			password:'',
			confirmPassword:''
		});*/
/*		try{
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
		}*/
	};

	const handleChange = event=> {
		const {name,value} = event.target;
// si ponemos name entre [] asignará el valor de la propiedad name del input (password o email) al valor value del input.
		setCredentials({...userCredentials,[name]:value});
	}


// desectructuramos this.state en displayName, emai, password, etc, y se les pasa a los FormInput esos values
	return (
		<SignUpContainer>	
			<TitleForm>I do not have an account</TitleForm>
			<span>Register with your e-mail and password</span>
			<form className='sign-up-form' onSubmit={handleSubmit}>
				<FormInput 
					type='text'
					name='displayName'
					value={displayName}
					onChange={handleChange}
					label='Display Name'
					required />
					<FormInput 
					type='email'
					name='email'
					value={email}
					onChange={handleChange}
					label='E-mail'
					required />
					<FormInput 
					type='password'
					name='password'
					value={password}
					onChange={handleChange}
					label='Choose Password'
					required />
					<FormInput 
					type='password'
					name='confirmPassword'
					value={confirmPassword}
					onChange={handleChange}
					label='Confirm Password'
					required />
				<CustomButton type='submit'>SIGN UP</CustomButton>				
			</form>
		</SignUpContainer>
	)
}


const mapDispatchToProps = dispatch => ({
	signUpStart:userCredentials => dispatch(signUpStart(userCredentials))
});

export default connect(null,mapDispatchToProps)(SignUp);