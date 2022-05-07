import React from 'react';
import FormUploadPage from './FormUploadPage';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';

export default {
  title: 'Form Upload Page',
  component: FormUploadPage,
  argTypes: {},
};

export const Test = () => (
  <ThemeProvider theme={theme}>
    <FormUploadPage />
  </ThemeProvider>
);
