import React from 'react';
import StyleProvider from '../../../utils/style-provider';
import EditPostingsForm from './EditPostingsForm';
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
  component: EditPostingsForm,
  title: 'EditPostingsForm',
  argTypes: {},
};

const Template = (args) => <StyleProvider><EditPostingsForm {...args} /></StyleProvider>;

export const Primary = Template.bind({});
Primary.args = {};
