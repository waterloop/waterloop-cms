import React from 'react';
import DropDownList from '.';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';

export default {
  title: 'DropDownList',
  component: DropDownList,
  argTypes: {},
};

const Template = (args) => <ThemeProvider theme={theme}><DropDownList {...args} /></ThemeProvider>;

export const EmptyList = Template.bind({});
EmptyList.args = {
  title: 'DropDownList',
  items: [],
};

export const NonEmptyList = Template.bind({});
NonEmptyList.args = {
  title: 'DropDownList',
  items: [
    {
      text: 'Hello',
      id: 123,
    },
    {
      text: 'Hello',
      id: 13,
    },
    {
      text: 'Hello',
      id: 3,
    },
    {
      text: 'Hello',
      id: 1,
    },
    {
      text: 'Hello',
      id: 11234,
    },
    {
      text: 'Hello',
      id: 1432,
    },
    {
      text: 'Hello',
      id: 12343,
    },
    {
      text: 'Hello? Is it me you are looking for? I am the really long item that is supposed to demostrate a long item in the list to show text wrapping',
      id: 1444,
    },
  ],
};
