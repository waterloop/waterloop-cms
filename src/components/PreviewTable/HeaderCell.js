import React from 'react';
import styled from 'styled-components';
import SortingVectorTop from './assets/SortingVectorTop.svg';
import SortingVectorTopColoured from './assets/SortingVectorTopColoured.svg';
import SortingVectorBottom from './assets/SortingVectorBottom.svg';
import SortingVectorBottomColoured from './assets/SortingVectorBottomColoured.svg';
import MUITableCell from '@material-ui/core/TableCell';

const TableCell = styled(MUITableCell)`
  cursor: pointer;
`;

const SortingTop = styled.img`
  width: 12px;
  margin-bottom: 2px;
`;

const SortingBottom = styled.img`
  width: 12px;
`;

const SortingIcon = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;

const ChartHeaderText = styled.div`
  position: relative;
  height: 24px;
  font: ${(props) => props.theme.fonts.bold18};
  line-height: 23px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #000000;
`;

const HeaderCell = ({
  onSort,
  title,
  sorted,
  ascending,
}) => (
  <TableCell>
    <ChartHeaderText onClick={onSort}>
      {title}
      <SortingIcon>
        <SortingTop
          src={
            sorted && ascending
              ? SortingVectorTopColoured
              : SortingVectorTop
          }
          alt="Table Header Sort Acceding"
        />
        <SortingBottom
          src={
            sorted && !ascending
              ? SortingVectorBottomColoured
              : SortingVectorBottom
          }
          alt="Table Header Sort Descending"
        />
      </SortingIcon>
    </ChartHeaderText>
  </TableCell>
);

export default HeaderCell;
