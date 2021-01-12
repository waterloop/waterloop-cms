import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import MUITableCell from '@material-ui/core/TableCell';
import MUISelect from '@material-ui/core/Select';

const TableCell = styled(MUITableCell)``;
const Select = styled(MUISelect)`
  border: 1px solid #C4C4C4;
`;

const ChartInfoText = styled.div`
  position: relative;
  height: 24px;
  font: ${(props) => props.theme.fonts.bold18};
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

const PostingsPreview = ({
  title,
  team,
  lastUpdated,
  openingStatus,
}) => (
  <>
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
      <Select value={openingStatus} defaultValue=""/>
    </TableCell>
  </>
);


export default PostingsPreview;
