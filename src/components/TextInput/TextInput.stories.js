import React from 'react';
import TextInput from '.';

export default {
  title: 'TextInput',
  component: TextInput,
  argTypes: {
    value: { control: 'text' },
  },
};

const Template = (args) => <TextInput {...args} />;

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
  value: 'Text a user has entered',
  multiLine: true,
};
