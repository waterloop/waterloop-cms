import React from 'react';
import DropDownList from '.';

export default {
  title: 'DropDownList',
  component: DropDownList,
  argTypes: {
    value: { control: 'text' },
  },
};

const Template = (args) => <DropDownList {...args} />;

export const EmptyList = Template.bind({});
EmptyList.args = {
  title: 'DropDownList',
  items: [],
};

export const NonEmptyList = Template.bind({});
NonEmptyList.args = {
  title: 'DropDownList',
  items: [
    'Hello',
  ],
};
