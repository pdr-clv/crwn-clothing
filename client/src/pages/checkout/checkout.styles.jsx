import styled from 'styled-components';

export const TextWarning = styled.div`
  text-align: center;
  margin-top: 40px;
  font-size: 24px;
  color:red;
`;

export const TextTotal = styled.div`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;
`;

export const HeaderBlock = styled.div`
  text-transform: capitalize;
  width: 23%;
  &:last-child {
    width: 8%;
  }
  @media screen and (max-width:800px) {
      width: 22%;
    &:last-child {
      width: 12%;
    }
  }
`;
// la última columna de header-block será mas estrecha, es sól para añadir le opción de quitar de la compra el item

export const CheckOutHeaderContainer = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgrey;
`;

export const CheckOutPageContainer = styled.div`
  width: 55%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 0;

  button {
    margin-left: auto;
    margin-top: 50px;
  }

  @media screen and (max-width:800px){
    width:90%;
  }
`;