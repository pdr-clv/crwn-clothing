import React from 'react';

import { SpinnerOverlay, SpinnerContainer} from './with-spinner.styles';

//withSpinner es un componente de orden superior, el cual envuelve a otro componente, que llamaremos WrappedComponent

const WithSpinner= WrappedComponent => {
// se crea una variable Spinner, la cual coge las propiedades del WrappedCoponent. Después se hará return de este Spinner. Esto es un componente Wrapped, envuelto en WithSpinner.
  const Spinner = ({ isLoading, ...otherProps}) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (<WrappedComponent {...otherProps} />);
  };
  return Spinner;
};

export default WithSpinner;