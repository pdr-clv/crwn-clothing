import React from 'react';

import Spinner from '../spinner/spinner.component';

//withSpinner es un componente de orden superior, el cual envuelve a otro componente, que llamaremos WrappedComponent

const WithSpinner= WrappedComponent => ({ isLoading, ...otherProps}) => {
  return isLoading ? <Spinner/> : <WrappedComponent {...otherProps} />
};


export default WithSpinner;