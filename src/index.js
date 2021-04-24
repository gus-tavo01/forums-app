import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import App from './App';
import darkGreenTheme from './styles/appTheme';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <MuiThemeProvider theme={darkGreenTheme}>
        <CssBaseline />
        <App />
      </MuiThemeProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
