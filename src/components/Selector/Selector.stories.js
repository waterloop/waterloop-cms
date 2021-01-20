import React from 'react';
import Selector from '.';

export default {
  title: 'Selector',
  component: Selector,
  argTypes: {
    value: { control: 'text' },
  },
};

const Template = (args) => <Selector {...args} />;

export const EmptyValue = Template.bind({});
EmptyValue.args = {
  value: '',
};

export const NonEmptyValue = Template.bind({});
NonEmptyValue.args = {
  value: 'Text a user has entered',
};
