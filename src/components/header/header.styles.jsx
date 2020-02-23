import styled from 'styled-components';
//importamos styled, para dar estilo a los componentes, se puede hacer directamente 
//importamos {css} para generar un bloque de estilos, y asignarlo después a un componente de una forma indirecta, pero se puede duplicar el mismo bloque de estilos para otros componentes, se utilizará en Link option y div option.
//no se utiliza porque utilizaremos la propiedad as='div' cuando llamemos a OptionLink.
import { Link } from 'react-router-dom';


export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;
// para poder dar estilo a un componente propio de react, se tiene que llamar así, no podemos poner styled.Link''
export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
// existe la opción de generar unicamente un OptionLink, pero cuando se llama al componente, se puede incluir as='div', y tendrá las propiedades de OptionLink, pero el componente se comportará como un link, así nos evitamos generar el componente OptionDiv, que es necesario para SIGN IN o SIGN OUT
export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;