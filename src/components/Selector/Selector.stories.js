import React from 'react';
import Selector from '.';
import styles from './Selector.module.css';
import theme from '../../theme';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider, StylesProvider } from '@material-ui/styles';


export default {
  title: 'Selector',
  component: Selector,
  argTypes: {
    value: { control: 'text' },
    items: { control: 'object' },
    className: { control: 'text' }
  },
};

const Template = (args) => (
  <ThemeProvider theme={theme}>
    <StylesProvider injectFirst>
      <MuiThemeProvider>
        <Selector {...args} />
      </MuiThemeProvider>
    </StylesProvider>
  </ThemeProvider>
);

export const EmptyValue = Template.bind({});
EmptyValue.args = {
  value: 0,
  items: []
};

export const NonEmptyValue = Template.bind({});
NonEmptyValue.args = {
  value: 1,
  items: [
    {id: 1, text: 'Text a user has entered'}, 
    {id: 2, text: '(Note that a test class overrides the selector css in storybook)'}, 
    {id: 3, text: 'Geese are our new overlords'}, 
    {id: 4, text: 'long text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'},
    {id: 5, text: 'Test1'},
    {id: 6, text: 'Test2'},
    {id: 7, text: 'Test3'},
    {id: 8, text: 'Test4'}
  ],
  className: styles.testClass
};
