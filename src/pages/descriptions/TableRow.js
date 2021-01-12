import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import MUITableCell from '@material-ui/core/TableCell';
import MUITableRow from '@material-ui/core/TableRow';

const Text = styled.div`
  position: relative;
  height: 24px;
  font: ${(props) => props.theme.fonts.bold18};
  line-height: 23px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #2B2B2B;
`;

const TableCell = styled(MUITableCell)``;

const TableRow = ({ teamName, lastUpdated }) => (
  <>
    <TableCell>
      <Text>{teamName}</Text>
    </TableCell>
    <TableCell>
      <Text>{moment(lastUpdated).format('MMM Do, YYYY')}</Text>
    </TableCell>
  </>
);

export default TableRow;
