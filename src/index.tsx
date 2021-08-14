import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  /* Until materialui version is not 5+, cant use Strict 
  <React.StrictMode>
    <App />
  </React.StrictMode>,*/
  <SnackbarProvider maxSnack={5} 
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }} 
  >
    <App />
  </SnackbarProvider>,
  document.getElementById('root')
);

