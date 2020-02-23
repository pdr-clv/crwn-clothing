import React from 'react';

import { 
	GroupContainer,
	FormInputContainer,
	FormInputLabel,
} from './form-input.styles';

const FormInput = ({handleChange, label, ...otherProps}) =>(
	<GroupContainer>
		<FormInputContainer
			onChange={handleChange}
			{...otherProps}
		/>
		{
//si se añade el atributo label, entonces se renderiza un label, si no se le pasa atributo, no se renderiza nada.
			label ?
			(
//en cuanto se escribe algo en el input, se detecta un value.length superior a 1, se sube el texto con la propiedad shrink			
//className={`${otherProps.value.length ? 'shrink':''} form-input-label`}
			<FormInputLabel className={`${otherProps.value.length ? 'shrink':''}`}>
				{label}
			</FormInputLabel>)
			:null
		}
	</GroupContainer>
);

export default FormInput;