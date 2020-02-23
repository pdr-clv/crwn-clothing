import React from 'react';
import { CustomButtonContainer } from './custom-button.styles';

//tenemos que crear el CustomButton que diferencie si va a ser isGoogleSignIn o inverted, se le pasa en las props, y según tenga ese valor, tomará unos estilos u otros.
const CustomButton = ({ children, ...props }) =>(
	<CustomButtonContainer {...props}>{children}</CustomButtonContainer>
);

export default CustomButton;