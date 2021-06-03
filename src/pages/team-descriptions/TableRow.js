import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import MUITableCell from '@material-ui/core/TableCell';

const Text = styled.div`
  position: relative;
  height: 24px;
  font: ${(props) => props.theme.fonts.bold18};
  line-height: 23px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #2b2b2b;
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
