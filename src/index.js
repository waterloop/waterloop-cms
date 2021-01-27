import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider, StylesProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import App from './App';
import theme from './theme';
import state from './state';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <MuiThemeProvider>
          <Provider store={state}>
            <App />
          </Provider>
        </MuiThemeProvider>
      </StylesProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

