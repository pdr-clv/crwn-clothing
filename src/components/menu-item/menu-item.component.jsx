import React from 'react';
import {Link} from 'react-router-dom';


import './menu-item.styles.scss';

const MenuItem = ({title,imageUrl,size,linkUrl}) => (
// se engloba todo dentro de un Link en lugar de un div, y este Link se encargará de dirigirnos a la ruta que pasa el linkUrl 
	<Link className={`${size} menu-item`} to={linkUrl}>
		<div 
		className='backgroung-image'
		style={{
			backgroundImage:`url(${imageUrl})`
		}}
		/>
		<div className='content'>
			<h1 className='title'>{title.toUpperCase()}</h1>
			<span className='subtitle'>SHOP NOW</span>
		</div>
	</Link>
);

export default MenuItem;