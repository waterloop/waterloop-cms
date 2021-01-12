import React, { useCallback } from 'react';
import styled from 'styled-components';
import MockData from './MockData';
import UnstyledButton from '../../components/Button';
import PreviewTable from '../../components/PreviewTable';
import TableRow from './TableRow';

const PageName = styled.div`
    font: ${(props) => props.theme.fonts.medium24};
    margin-bottom: 20px;
`;

const OuterContainer = styled.div`
  font-family: 'IBM Plex Sans';
  margin: ${(props) => props.theme.pageMargin};
`;
const Button = styled(UnstyledButton)``;
const ButtonContainer = styled.div`
    display: flex;
    margin-bottom: 20px;
    ${Button} {
      margin-right: 16px;
    }
`;

const TeamDescriptionsPage = () => {
  const list = MockData;
  const headers = [
    {
      id: 'teamName',
      value: 'Team',
    },
    {
      id: 'lastUpdated',
      value: 'Last Updated',
    },
  ];

  // eslint-disable-next-line no-unused-vars
  const handleEdit = useCallback((teamId) => {
    // TODO implement this function
  }, [/* Add Dependencies if any */]);

  return (
    <OuterContainer>
      <PageName>
        Teams Page Description
      </PageName>
      <ButtonContainer>
        <Button secondary>Edit description</Button>
        <Button>Preview</Button>
      </ButtonContainer>
      <PreviewTable headers={headers} RowComponent={TableRow} onEdit={handleEdit} rows={list} />
    </OuterContainer>
  );
};

export default TeamDescriptionsPage;
