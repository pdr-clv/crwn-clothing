import React from 'react';

import './custom-button.styles.scss';
//tenemos que crear el CustomButton que diferencie si va a ser isGoogleSignIn o inverted, se le pasa en las props, y según tenga ese valor, tomará unos estilos u otros.
const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherProps }) => (
	<button className={`${inverted ? 'inverted' : '' } ${isGoogleSignIn ? 'google-sign-in' : '' } custom-button`}
	{...otherProps}>
		{children}
	</button>
);

export default CustomButton;