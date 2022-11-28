import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import TableCell from '@mui/material/TableCell';

import useTeams from '../../hooks/teams';
import { buttonCopies, mainCopies } from './Copies';
import Button from '../../components/Button';
import PreviewTable from '../../components/PreviewTable';

const Container = styled.div`
  margin: ${({ theme }) => theme.pageMargin};
  & input,
  textarea {
    box-sizing: border-box;
  }
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    margin: ${({ theme }) => theme.mobilePageMargin};
    text-align: center;
  }
`;

const PageDescriptionText = styled.h3`
  margin-bottom: 20px;
  font: ${({ theme }) => theme.fonts.medium24};
`;

const Text = styled.p`
  font: ${({ theme }) => theme.fonts.medium18};
`;

const TextBold = styled.p`
  font: ${({ theme }) => theme.fonts.bold18};
`;

const TableLabelHeader = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    justify-content: center;
    flex-direction: column;
    margin-bottom: 20px;
  }
`;

const TableLabel = styled.h1`
  font: ${({ theme }) => theme.fonts.bold36};
  font-style: italic;
`;

const ButtonContainer = styled.div`
  & > * {
    margin-right: 20px;
    margin-top: 10px;
    @media only screen and (max-width: ${({ theme }) =>
        theme.breakpoints.md}px) {
      margin-right: 0;
    }
  }
`;

const headers = [
  { id: 'teamName', value: mainCopies.TEAM_NAME_COLUMN },
  { id: 'lastUpdated', value: mainCopies.TEAM_LAST_UPDATED_COLUMN },
];

const RowComponent = ({ teamName, lastUpdated }) => (
  <>
    <TableCell>
      <TextBold>{teamName}</TextBold>
    </TableCell>
    <TableCell>
      <Text>{moment(lastUpdated).format('MMM Do, YYYY')}</Text>
    </TableCell>
  </>
);

const TeamDescriptionsPage = () => {
  const history = useHistory();
  const { teams } = useTeams();

  return (
    <Container>
      <PageDescriptionText>{mainCopies.TEAM_PAGE_LABEL}</PageDescriptionText>
      <ButtonContainer>
        <Button
          label={buttonCopies.EDIT_DESCRIPTION}
          secondary
          link
          to="team-descriptions/description"
        />
        <Button label={buttonCopies.PREVIEW} primary />
      </ButtonContainer>
      <TableLabelHeader>
        <TableLabel>{mainCopies.TABLE_LABEL}</TableLabel>
        <Button
          label={buttonCopies.NEW_TEAM}
          primary
          link
          to="team-descriptions/-1"
        />
      </TableLabelHeader>
      <PreviewTable
        headers={headers}
        rows={teams}
        RowComponent={RowComponent}
        onEdit={(teamId) => {
          history.push(`team-descriptions/${teamId}`);
        }}
      />
    </Container>
  );
};

export default TeamDescriptionsPage;
