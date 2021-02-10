import React from 'react';
import TextInput from '.';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';

export default {
  title: 'TextInput',
  component: TextInput,
  argTypes: {
    value: { control: 'text' },
  },
};

const Template = (args) => <ThemeProvider theme={theme}><TextInput {...args} /></ThemeProvider>;

export const SingleLineEmpty = Template.bind({});
SingleLineEmpty.args = {
  value: '',
};

export const SingleLineFilled = Template.bind({});
SingleLineFilled.args = {
  value: 'Text a user has entered',
};

export const MultiLineEmpty = Template.bind({});
MultiLineEmpty.args = {
  value: '',
  multiLine: true,
};

export const MultiLineFilled = Template.bind({});
MultiLineFilled.args = {
  value: 'Text a user has entered and a long sentence appears like lorem  ipsum lorem ipsum lorem ipsum Text a user has entered and a long sentence appears like lorem  ipsum lorem ipsum lorem ipsum Text a user has entered and a long sentence appears like lorem  ipsum lorem ipsum lorem ipsum Text a user has entered and a long sentence appears like lorem  ipsum lorem ipsum lorem ipsum Text a user has entered and a long sentence appears like lorem  ipsum lorem ipsum lorem ipsum',
  multiLine: true,
};
