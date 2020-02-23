import styled, { css } from 'styled-components';
// generaremos bloques de estilo en css, importaremos { css }, y según que propiedad tenga el componente button, le cargará unos estilos u otros.

const buttonStyles = css`
  background-color: black;
  color: white;
  border: none;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;
//para asegurarnos que siempre está en el centro, se pone display:felx y justify-content:center;
const invertedButtonStyles = css`
  background-color: white;
  color: black;
  border: 1px solid black;

  &:hover{
    background-color: black;
    color: white;
  }
`;

const googleSignInStyles = css`
  background-color: #4285f4;
  color:white;

  &:hover{
    background-color: white;
    color:#4285f4;
    border:1px solid #4285f4;
  }
`;

// como es javascript, no es CSS puro, podemos crear una función que según que props recibamos, podamos asignar unos estilos u otros al botón. Es para asignar si es botón es invertido, es GoogleSign, etc.

const getButtonStyles = props =>{
  if (props.isGoogleSignIn) {
    return googleSignInStyles;
  }

  return props.inverted ? invertedButtonStyles : buttonStyles;
};

export const CustomButtonContainer = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  text-transform: uppercase;
  font-family: 'Open Sans Condensed';
  font-weight: bolder;
  cursor: pointer;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  
  ${getButtonStyles}

`;

// para asegurarnos que siempre está centrado el texto ponemos display:flex;  justify-content:center;
// podemos llamar una función extrapolada con ${} dentro de los estilos CSS in js de botón, y según las props que reciba, pues se le dará el estilo inverted, googleSignIn o el default.