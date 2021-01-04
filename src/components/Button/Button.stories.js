import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';

import Button from '.';

export default {
  title: 'Button',
  component: Button,
  argTypes: {},
};

const Template = (args) => <ThemeProvider theme={theme}><Button {...args} /></ThemeProvider>;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  secondary: true,
  label: 'Button',
};

export const Link = Template.bind({});
Link.args = {
  label: 'Button',
  link: true,
};

export const SecondaryLink = Template.bind({});
SecondaryLink.args = {
  secondary: true,
  label: 'Button',
  link: true,
};
