import styled from 'styled-components';
//importamos CustomButton, y le damos propiedades css, y se exportará después al componente collection-item, y ya se pasará con la funcionalidad de customButton, y los estilos aquí dados.
import CustomButton from '../custom-button/custom-button.component';

export const CollectionItemContainer = styled.div`
  width: 21vw;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;
  &:hover {
    img {
      opacity:0.8;
    }
    button{
        display:flex;
    }
  }
  @media screen and (max-width:800px) {
    width:40vw;
    &:hover {
    img {
      opacity:unset;
    }
    button{
        display:flex;
    }
  }
  }
`;
//al darle display flex al boton, se hace visible
export const BackgroundImage = styled.div`
  width: 100%;
  height: 95%;
  background-size: cover;
  background-position: center;
  margin-bottom: 5px;
  background-image: ${({imageUrl}) => `url(${imageUrl})`};
`;
//la propiedad imageUrl se le pasa desde el componente, y se extrapola a variable javascript para obtener el url del BackgroundImage del div generado para la foto.
export const AddButton = styled(CustomButton)`
  width: 80%;
  opacity:0.7;
  position: absolute;
  top:255px;
  display: none;

  @media screen and (max-width:800px) {
    display:block;
    opacity:0.9;
    min-width:unset;
    padding: 0 10px;
  }
`;

export const CollectionFooterContainer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`;

export const NameContainer = styled.div`
  width: 90%;
  margin-bottom: 15px;
`;

export const PriceContainer = styled.div`
  width: 10%;
`;