import 'react-datepicker/dist/react-datepicker.css'; // Adds styling to the datePicker
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider, StylesProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import theme from '../theme';
const muitheme = createMuiTheme();

const StyleProvider = ({ children }) => (
  <ThemeProvider theme={theme}>
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={muitheme}>
        {children}
      </MuiThemeProvider>
    </StylesProvider>
  </ThemeProvider>
);

export default StyleProvider;
