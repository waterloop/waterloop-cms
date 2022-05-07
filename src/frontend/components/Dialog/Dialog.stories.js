import React from 'react';
import StyleProvider from '../../utils/style-provider';
import Dialog from '.';
import Button from '../Button';
import { TextInputRequired } from '../FormContainer/FormContainer.stories';

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
  subcomponents: { TextInputRequired },
  title: 'Dialog',
  argTypes: {},
};

const Template = (args) => <StyleProvider><Dialog {...args} /></StyleProvider>;

export const Primary = Template.bind({});
Primary.args = {
  open: true,
  children: <TextInputRequired {...TextInputRequired.args} />,
  actionChildren: (
    <>
      <Button onClick={() => {}}>Save</Button>
      <Button cancel onClick={() => {}}>Cancel</Button>
    </>
  ),
  title: 'Add New Requirement',
  wide: true
};

export const Error = Template.bind({});
Error.args = {
  open: true,
  children: <p>Error 400 - Please verify that you entered valid information</p>,
  actionChildren: (
    <Button onClick={() => {}}>Okay</Button>
  ),
  title: 'ERROR',
  wide: false
};
