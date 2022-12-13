import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import MainContainer from './main-container/MainContainer';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <MainContainer>
    <App />
  </MainContainer>
);

