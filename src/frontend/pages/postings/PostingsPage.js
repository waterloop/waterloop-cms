import React, { useCallback } from 'react';
import PostingPreview from './PostingsPreview';
import usePostings from '../../hooks/postings';
import UnstyledHeaderPreview from './HeadersPreview';
import useHeaders from './hooks/headers';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Button from '../../components/Button';
import PreviewTable from '../../components/PreviewTable';
import { useHistory, useRouteMatch } from 'react-router-dom';
import api from '../../api';
import * as userSelectors from '../../state/user/selectors';

const ChartTitle = styled.div`
  font-style: italic;
  font: ${({ theme }) => theme.fonts.bold36};
  color: #2b2b2b;
  margin-bottom: 8px;
`;

const NewOpeningButton = styled(Button)`
  align-self: flex-end;
  margin-top: 8px;
  margin-bottom: -16px;
`;

const HeaderPreview = styled(UnstyledHeaderPreview)`
  margin-top: 32px;
`;
const Container = styled.div`
  margin: ${({ theme }) => theme.pageMargin};
  display: flex;
  flex-direction: column;
`;

const PostingsPage = () => {
  const { postings, updatePostingClosed, addPosting } = usePostings();
  const { headers } = useHeaders();
  const history = useHistory();
  const { url } = useRouteMatch();

  const handleEditPosting = useCallback(
    (id) => {
      // eslint-disable-next-line no-console
      console.log(`Edit the Posting with id ${id}`);
      history.push(`${url}/${id}`);
    },
    [history, url],
  );

  const handleEditHeader = (id) => () => {
    // eslint-disable-next-line no-console
    console.log(`Edit the Header with id ${id}`);
  };

  const headerItems = headers.map((header) => (
    <HeaderPreview
      key={header.id}
      onEdit={handleEditHeader(header.id)}
      {...header}
    />
  ));

  const updateClosed = (id) => (closedState) => {
    updatePostingClosed(id, closedState);
  };

  const tableHeaders = [
    {
      id: 'title',
      value: 'Opening Role',
    },
    {
      id: 'team',
      value: 'Sub team',
    },
    {
      id: 'lastUpdated',
      value: 'last updated',
    },
    {
      id: 'closed',
      value: 'Opening Status',
    },
  ];
  return (
    <Container>
      {headerItems}
      <NewOpeningButton onClick={addPosting}>New Opening +</NewOpeningButton>
      <ChartTitle>Team Openings</ChartTitle>
      <PreviewTable
        headers={tableHeaders}
        rows={postings.map((posting) => ({
          ...posting,
          onClosedChanged: updateClosed(posting.id),
        }))}
        RowComponent={PostingPreview}
        onEdit={handleEditPosting}
      />
    </Container>
  );
};

export default PostingsPage;
