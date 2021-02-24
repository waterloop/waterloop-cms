import React from 'react';
import StyleProvider from '../../utils/style-provider';
import Dialog from '.';
/**
* Default export contains information
* about the story.
* It can have the following fields:
* - component      - the component itself
* - title          - How the component is referred to in the side bar
* - excludeStories - exports from this file that should not be rendered
* - argTypes       - specify the args behaviour in each story
*/
export default {
  component: Dialog,
  title: 'Dialog',
  argTypes: {},
};

const Template = (args) => <StyleProvider><Dialog {...args} /></StyleProvider>;

export const Primary = Template.bind({});
Primary.args = {
  open: true,
  value: 'input text',
  title: 'Add New Requirement',
  fieldLabel: 'Requirement',
};
