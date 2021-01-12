import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';
import TableCell from '@material-ui/core/TableCell';

import PreviewTable from '.';

export default {
  title: 'Preview Table',
  component: PreviewTable,
  argTypes: {},
};

const Template = (args) => <ThemeProvider theme={theme}><PreviewTable {...args} /></ThemeProvider>;

const RowComponent = ({ columnOne, columnTwo, columnThree }) => (
  <>
    <TableCell>{columnOne}</TableCell>
    <TableCell>{columnTwo}</TableCell>
    <TableCell>{columnThree}</TableCell>
  </>
);

const rows = [
  {
    columnOne: 'Hello',
    columnTwo: 'World',
    columnThree: 'Waterloop',
  },
  {
    columnOne: 'Another',
    columnTwo: 'Row',
    columnThree: 'Waterloop',
  },
];

const headers = [
  {
    id: 'columnOne',
    value: 'Column One',
  },
  {
    id: 'columnTwo',
    value: 'Second Column',
  },
  {
    id: 'columnThree',
    value: 'Team Name',
  },
];

export const Primary = Template.bind({});
Primary.args = {
  headers,
  rows,
  RowComponent,
};
