import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';
import ImagePreview from '../ImagePreview';

import FormContainer from '.';

export default {
  title: 'FormContainer',
  component: FormContainer,
  argTypes: {},
};

const Template = (args) => (
  <ThemeProvider theme={theme}>
    <FormContainer {...args} />
  </ThemeProvider>
);

export const TextArea = Template.bind({});
TextArea.args = {
  title: 'Text Area',
  children: <textarea>This is a bunch of placeholder text</textarea>,
};

export const Title = Template.bind({});
Title.args = {
  title: 'Title',
  children: <input type="text" />,
};

export const SelectMenu = Template.bind({});
SelectMenu.args = {
  title: 'Select Menu',
  children: (
    <select>
      <option value="Junior Developer">Junior Developer</option>
      <option value="Designer">Designer</option>
      <option selected value="Product Tester">
        Product Tester
      </option>
      <option value="Mechanical Team">Mechanical Team</option>
    </select>
  ),
};

export const SubmitImage = Template.bind({});
SubmitImage.args = {
  title: 'Submit an Image',
  children: <ImagePreview />,
};
