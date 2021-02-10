import React from 'react';
import Selector from '.';

export default {
  title: 'Selector',
  component: Selector,
  argTypes: {
    value: { control: 'text' },
    items: { control: 'array' }
  },
};

const Template = (args) => <Selector {...args} />;

export const EmptyValue = Template.bind({});
EmptyValue.args = {
  value: '',
  items: []
};

export const NonEmptyValue = Template.bind({});
NonEmptyValue.args = {
  value: 'Text a user has entered',
  items: ['Text a user has entered', 
    'Other text', 
    'Geese are our new overlords', 
    'long text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    'Test1',
    'Test2',
    'Test3',
    'Test4',
  ]
};
