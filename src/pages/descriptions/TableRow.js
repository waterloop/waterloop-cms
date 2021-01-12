import React from 'react';
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

const Row = styled(MUITableRow)`
  height: 80px;
  font: ${({ theme }) => theme.fonts.medium18};
  line-height: 23.4px;
  color: #000000;
  border: 2px solid #C4C4C4;
  box-sizing: border-box;
`;

const TableRow = ({ team, lastUpdated }) => (
  <Row>
    <TableCell>
      <Text>{team}</Text>
    </TableCell>
    <TableCell>
      <Text>{lastUpdated}</Text>
    </TableCell>
  </Row>
);

export default TableRow;
