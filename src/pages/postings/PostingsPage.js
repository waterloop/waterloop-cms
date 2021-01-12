import React, { useCallback } from 'react';
import PostingPreview from './PostingsPreview';
import usePostings from '../../hooks/postings';
import UnstyledHeaderPreview from './HeadersPreview';
import useHeaders from './hooks/headers';
import styled from 'styled-components';

import Button from '../../components/Button';
import PreviewTable from '../../components/PreviewTable';

const ChartTitle = styled.div`
  font-style: italic;
  font: ${({ theme }) => theme.fonts.bold36};
  color: #2B2B2B;
  margin-bottom: 8px;
`;

const NewOpeningButton = styled(Button)`
  align-self: flex-end;
  margin-top: 8px;
  margin-bottom: -16px
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
  const { postings, editPosting } = usePostings();
  const { headers, editHeader } = useHeaders();

  const handleEditPosting = useCallback((id) => {
    console.log(`Edit the Posting with id ${id}`);
  }, []);

  const handleEditHeader = (id) => () => {
    console.log(`Edit the Header with id ${id}`);
  };

  const headerItems = headers.map(
    (header) => <HeaderPreview key={header.id} onEdit={handleEditHeader(header.id)} {...header} />,
  );

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
      id: 'status',
      value: 'Opening Status',
    },
  ];
  return (
    <Container>
      {headerItems}
      <NewOpeningButton>New Opening +</NewOpeningButton>
      <ChartTitle>Team Openings</ChartTitle>
      <PreviewTable
        headers={tableHeaders}
        rows={postings}
        RowComponent={PostingPreview}
        onEdit={handleEditPosting}
      />
    </Container>
  );
};

export default PostingsPage;
