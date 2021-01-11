import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import EditIcon from './assets/EditIcon.svg';
import OptionsVector from './assets/OptionsVector.svg';

import MUITableCell from '@material-ui/core/TableCell';
import MUITableRow from '@material-ui/core/TableRow';

const TableCell = styled(MUITableCell)``;

const ChartRow = styled(MUITableRow)`
  height: 80px;
  font: ${({ theme }) => theme.fonts.medium18};
  line-height: 23.4px;
  color: #000000;
  border: 2px solid #C4C4C4;
  box-sizing: border-box;
`;

const ChartInfoText = styled.div`
  position: relative;
  height: 24px;
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 23px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #2B2B2B;
`;

const LastUpdatedText = styled.div`
  position: relative;
  height: 24px;
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 23px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #2B2B2B;
`;

const Button = styled.button`
  position: relative;
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 23px;
  display: flex;
  flex-direction: row;
  background-color: white;
  color: #2B2B2B;
  box-sizing: border-box;
  border-radius: 15px;
`;

const StatusBorder = styled(Button)`
  height: 47.13px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #C4C4C4;
`;

const OptionsIcon = styled.img`
  margin-left: 35px;
`;

const EditButton = styled(Button)`
  width: 89px;
  height: 36px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #FED95A;
`;

const EditButtonText = styled.div`
  margin-left: 12px;
`;

const EditButtonIcon = styled.img`
  padding-left: 8px;
`;

const PostingsPreview = ({
  title,
  team,
  lastUpdated,
  openingStatus,
}) => (
  <ChartRow>
    <TableCell>
      <ChartInfoText>{title}</ChartInfoText>
    </TableCell>
    <TableCell>
      <ChartInfoText>{team}</ChartInfoText>
    </TableCell>
    <TableCell>
      <LastUpdatedText>{moment(lastUpdated).format('MMM Do, YYYY')}</LastUpdatedText>
    </TableCell>
    <TableCell>
      <StatusBorder>
        {openingStatus}
        <OptionsIcon src={OptionsVector} alt="edit" />
      </StatusBorder>
    </TableCell>
    <TableCell>
      <EditButton>
        <EditButtonText>Edit</EditButtonText>
        <EditButtonIcon src={EditIcon} alt="edit" />
      </EditButton>
    </TableCell>
  </ChartRow>
);


export default PostingsPreview;
