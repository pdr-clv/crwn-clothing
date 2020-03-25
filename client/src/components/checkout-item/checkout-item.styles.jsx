import styled from 'styled-components';

export const CheckOutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`;

export const ImgContainer = styled.div`
  width: 23%;
  padding-right: 15px;

  img {
    width: 100%;
    height: 100%;
  }
`;

//ImgContainer es un div que tiene dentro a una imagen. se mete dentro de un div la imagen para darle un ancho y padding.
export const TextContainer = styled.span`
  width: 23%;
`;
// textcontainer contiene precio, cantidad y nombre del articulo. cantidad después se le dará estilos a parte.
export const QuantityContainer = styled(TextContainer)`
  display:flex;
    
  div{
    font-size: 16px;
    cursor: pointer;
  }
  span {
    margin:0 10px;
  }
`;
// el span es para la cantidad, y el div es para la flecha arrow.
export const RemoveButtonContainer = styled.div`
  padding-left: 12px;
  cursor: pointer;
`;