import React from 'react';

import { SpinnerOverlay, SpinnerContainer} from './with-spinner.styles';

//withSpinner es un componente de orden superior, el cual envuelve a otro componente, que llamaremos WrappedComponent

const WithSpinner= WrappedComponent => {
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