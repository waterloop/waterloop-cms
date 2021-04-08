import React from 'react';
import useSponsors from '../../hooks/sponsors';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';

import { buttonCopies, mainCopies, commonCopies } from './Copies';

import TableCell from '@material-ui/core/TableCell';
import UnstyledSelector from '../../components/Selector';
import UnstyledPreviewTable from '../../components/PreviewTable';
import Button from '../../components/Button';


const Container = styled.div`
  margin: ${({ theme }) => theme.pageMargin};
  & input, textarea {
    box-sizing: border-box;
  }
  @media only screen and (max-width: ${({theme}) => theme.breakpoints.md}px) {
    margin: ${({ theme }) => theme.mobilePageMargin};
  }
`;

const PageDescriptionText = styled.h3`
  margin-bottom: 12px;
  font: ${({theme}) => theme.fonts.medium24};
`;

const Text = styled.p`
  font: ${({theme}) => theme.fonts.medium18};
`;

const TextBold = styled.p`
  font: ${({theme}) => theme.fonts.bold18};
`;

const TableLabelHeader = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

const TableLabel = styled.h1`
  font: ${({theme}) => theme.fonts.bold36};
  font-style: italic;
`;

const Selector = styled(UnstyledSelector)`
  max-width: 250px;
  width: 100%;
`;

const ButtonContainer = styled.div`
  &>* {
    margin-right: 20px;
  }
`;

const headers = [
  {id: '1', value: mainCopies.SPONSOR_NAME_COLUMN}, 
  {id: '2', value: commonCopies.LAST_UPDATED_DATE}, 
  {id: '3', value: mainCopies.SPONSOR_LEVEL_COLUMN}
]

const RowComponent = (sponsorTiers) => ({name, lastUpdated, tier}) => (
  <>
    <TableCell>
      <TextBold>{name}</TextBold>
    </TableCell>
    <TableCell>
      <Text>{lastUpdated}</Text>
    </TableCell>
    <TableCell>
      {/* TODO: Figure out how to get the value to update here: Maybe have a direct call to update specific sponsor? Or define redux in sponsor-main.js */}
      <Selector value={tier} items={sponsorTiers} placeholder={"NOTHING; PLEASE CHANGE"}/>
    </TableCell>
  </>
)

const SponsorsPage = () => {
  // TODO: Move this to sponsor-main.js and define redux to store Selector value + update backend when value changes (async :) )
  const { sponsorTiers, sponsors } = useSponsors();
  const tableRows = sponsors.map((sponsor) => {
    return {
      id: sponsor.sponsorId,
      name: sponsor.name,
      lastUpdated: sponsor.lastUpdated,
      tier: sponsor.tierId
    }
  });

  const history = useHistory();

  return (
    <Container>
      <PageDescriptionText>{mainCopies.SUPPORT_TEAM_LABEL}</PageDescriptionText>
      <ButtonContainer>
        <Button 
          label={buttonCopies.EDIT_DESCRIPTION} 
          secondary 
          link
          to={"sponsors/description"}
        />
        <Button label={buttonCopies.PREVIEW} primary />
      </ButtonContainer>

      <TableLabelHeader>
        <TableLabel>{mainCopies.TABLE_LABEL}</TableLabel>
        <Button 
          label={buttonCopies.NEW_SPONSOR} 
          primary 
          link
          to={"sponsors/-1"}
        />
      </TableLabelHeader>
      <UnstyledPreviewTable 
        headers={headers}
        rows={tableRows}
        RowComponent={RowComponent(sponsorTiers)}
        onEdit={(sponsorId) => {
          history.push(`sponsors/${sponsorId}`);
        }}
      />
    </Container>
  );
}

export default SponsorsPage;