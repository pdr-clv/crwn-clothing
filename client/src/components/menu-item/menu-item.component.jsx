import React from 'react';
import { withRouter } from 'react-router-dom';

import {
	LinkMenuItem,
	BackgroundImg,
	ContentContainer
} from './menu-item.styles';

const MenuItem = ({title,imageUrl,size,linkUrl,history,match}) => (
// se engloba todo dentro de un Link en lugar de un div, y este Link se encargará de dirigirnos a la ruta que pasa el linkUrl 
	<LinkMenuItem size={size}
	onClick={() => history.push(`${match.url}${linkUrl}`)}>
		<BackgroundImg className='imagen' imageUrl={imageUrl} />
		<ContentContainer className='contenido'>
			<h1>{title.toUpperCase()}</h1>
			<span>SHOP NOW</span>
		</ContentContainer>
	</LinkMenuItem>
);

export default withRouter(MenuItem);