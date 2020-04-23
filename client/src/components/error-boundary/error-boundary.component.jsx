import React from 'react';

import {ErrorImageOverlay, 
  ErrorImageContainer, 
  ErrorImageText} from './error-boundary.styles';
//este componente envolverá uno o varios componentes, y si hay un error, lo capturará y renderizará una página de error.
class ErrorBoundary extends React.Component {

  constructor(){
    super();

    this.state = {
      hasErrored:false
    }
  }
//static getDerived... se encarga de capturar el error que suceda dentro de cada hijo que haya dentro de este componente que envuelve otros componentes.
  static getDerivedStateFromError(error) {
    //process the error
    return { hasErrored:true};
  }
//si captura un error, entonces, se hace lo que está dentro del componentdidcatch
  componentDidCatch(error, info){
    console.error(error);
  }

  render() {
    if (this.state.hasErrored) {
      return (<ErrorImageOverlay>
        <ErrorImageContainer imageUrl='https://i.imgur.com/A040Lxr.png'/>
        <ErrorImageText>Something went wrong. It ocurred a fatal error. Website will not render</ErrorImageText>
      </ErrorImageOverlay>);
    }

    return this.props.children;
  }
}

export default ErrorBoundary;