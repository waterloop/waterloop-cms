import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import HeaderCell from './HeaderCell';
import EditIcon from './assets/EditIcon.svg';
import MUITableCell from '@mui/material/TableCell';
import MUITable from '@mui/material/Table';
import MUITableBody from '@mui/material/TableBody';
import MUITableRow from '@mui/material/TableRow';
import MUITableContainer from '@mui/material/TableContainer';
import MUITableHead from '@mui/material/TableHead';
import useSortedRows from './hooks/sorted-rows';
import Button from '../../components/Button';

const Table = styled(MUITable)``;
const TableBody = styled(MUITableBody)``;
const TableRow = styled(MUITableRow)``;
const TableContainer = styled(MUITableContainer)``;

const TableHead = styled(MUITableHead)`
  background: #f4f4f4;
`;

const BodyRow = styled(MUITableRow)`
  height: 80px;
  font: ${({ theme }) => theme.fonts.medium18};
  line-height: 23.4px;
  color: #000000;
  box-sizing: border-box;
`;

const Chart = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 70%;
  border: 2px solid #c4c4c4;
  border-radius: 10px 10px 0px 0px;
`;

const EditButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 89px;
  height: 36px;
  border: 1px solid ${(props) => props.theme.colours.yellows.yellow2};
  font: ${(props) => props.theme.fonts.bold18};
  line-height: 23px;
  background-color: white;
  color: ${(props) => props.theme.colours.blacks.black3};
  box-sizing: border-box;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colours.greys.grey1};
    border-width: 2px;
  }
`;

const EditButtonText = styled.div`
  margin-left: 12px;
`;

const EditButtonIcon = styled.img`
  padding-left: 8px;
`;

const TableCell = styled(MUITableCell)``;

const PreviewTable = ({
  className, headers, rows, RowComponent, onEdit, onSummary
}) => {
  const { sortedRows, onSort } = useSortedRows(rows);

  const headerItems = headers.map((header) => (
    <HeaderCell
      key={header.id}
      title={header.value}
      onSort={() => onSort(header.id)}
      sorted={header.id === sortedRows.headerId}
      ascending={sortedRows.ascending}
    />
  ));

  const sortedRowItems = sortedRows.rows.map(
    (row) => (
      <BodyRow key={row.id}>
        <RowComponent
          {...row}
        />
        {onEdit
         ? <TableCell>
            <EditButton onClick={() => onEdit(row.id)}>
              <EditButtonText>Edit</EditButtonText>
              <EditButtonIcon src={EditIcon} alt="edit" />
            </EditButton>
          </TableCell>
          :<></>
        }
        {onSummary &&
         <TableCell>
            <Button
              label="Summary"
              onClick={() => onSummary(row.summary)}
            />
          </TableCell>
        }
      </BodyRow>
    ),
  );

  return (
    <TableContainer component={Chart} className={className}>
      <Table>
        <TableHead>
          <TableRow>
            {headerItems}
            <TableCell /> {/** Place holder column for the edit button */}
          </TableRow>
        </TableHead>
        <TableBody>{sortedRowItems}</TableBody>
      </Table>
    </TableContainer>
  );
};

/**
 * DevNote: PropTypes are not always necessary in this repo, but can be used to add clarity
 *          for others implementing a component that they did not write.
 */
PreviewTable.propTypes = {
  className: PropTypes.string,
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      id:
        PropTypes.string /** The id values correspond to properties of a row */,
      value: PropTypes.string,
    }),
  ),
  rows: PropTypes.arrayOf(PropTypes.object),
  RowComponent: PropTypes.element,
  onEdit: PropTypes.func /** (rowId) => void */,
};

export default PreviewTable;
