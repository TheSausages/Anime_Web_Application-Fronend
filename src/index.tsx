import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SnackbarProvider } from 'notistack';
import React from 'react';

ReactDOM.render(
  <SnackbarProvider maxSnack={5} 
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }} 
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </SnackbarProvider>,
  document.getElementById('root')
);

