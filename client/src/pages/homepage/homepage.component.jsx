import React from 'react';
import Directory from '../../components/directory/directory.component';
// creamos el CSS en Js usando la libreria styled-components en el archivo hompage.styles.jsx. Después se envuelve lo que se desea dar este estilo especifico dentro de este componente.
import { HomePageContainer } from './homepage.styles';

const HomePage = () => (
	<HomePageContainer>
		<Directory />
	</HomePageContainer>
);

export default HomePage;