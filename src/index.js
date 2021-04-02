import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { defaultTheme } from './styles/appTheme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <MuiThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <App />
      </MuiThemeProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
