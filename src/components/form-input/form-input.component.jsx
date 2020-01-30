import React from 'react';

import './form-input.styles.scss';

const FormInput = ({handleChange, label, ...otherProps}) =>(
	<div className='group'>
		<input className='form-input'
			onChange={handleChange}
			{...otherProps}
		/>
		{
//si se añade el atributo label, entonces se renderiza un label, si no se le pasa atributo, no se renderiza nada.
			label ?
			(
//en cuanto se escribe algo en el input, se detecta un value.length superior a 1, se sube el texto con la propiedad shrink			
			<label className={`${otherProps.value.length ? 'shrink':''} form-input-label`}>
				{label}
			</label>)
			:null
		}
	</div>
);

export default FormInput;