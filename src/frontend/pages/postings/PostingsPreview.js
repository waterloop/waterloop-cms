import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import MUITableCell from '@material-ui/core/TableCell';
import Selector from '../../components/Selector';

const TableCell = styled(MUITableCell)``;

const ChartInfoText = styled.div`
  position: relative;
  height: 24px;
  font: ${(props) => props.theme.fonts.bold18};
  line-height: 23px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #2b2b2b;
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
  color: #2b2b2b;
`;

const PostingsPreview = ({
  title,
  team,
  lastUpdated,
  closed,
  onClosedChanged,
}) => (
  <>
    <TableCell>
      <ChartInfoText>{title}</ChartInfoText>
    </TableCell>
    <TableCell>
      <ChartInfoText>{team}</ChartInfoText>
    </TableCell>
    <TableCell>
      <LastUpdatedText>
        {moment(lastUpdated.getTime()).format('MMM Do, YYYY')}
      </LastUpdatedText>
    </TableCell>
    <TableCell>
      <Selector
        onSelect={onClosedChanged}
        value={closed ? '1' : '0'}
        items={[
          { id: '1', text: 'closed' },
          { id: '0', text: 'open' },
        ]}
      />
    </TableCell>
  </>
);

export default PostingsPreview;
