import 'react-datepicker/dist/react-datepicker.css'; // Adds styling to the datePicker
import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  ThemeProvider as MuiThemeProvider,
  StyledEngineProvider,
  createTheme,
} from '@mui/material/styles';
import theme from '../theme';
const muitheme = createTheme();

const StyleProvider = ({ children }) => (
  <ThemeProvider theme={theme}>
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={muitheme}>{children}</MuiThemeProvider>
    </StyledEngineProvider>
  </ThemeProvider>
);

export default StyleProvider;
