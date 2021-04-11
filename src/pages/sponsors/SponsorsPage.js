import React from 'react';
import useSponsors from '../../hooks/sponsors';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';

import { buttonCopies, mainCopies } from './Copies';

import TableCell from '@material-ui/core/TableCell';
import UnstyledPreviewTable from '../../components/PreviewTable';
import Button from '../../components/Button';


const Container = styled.div`
  margin: ${({ theme }) => theme.pageMargin};
  & input, textarea {
    box-sizing: border-box;
  }
  @media only screen and (max-width: ${({theme}) => theme.breakpoints.md}px) {
    margin: ${({ theme }) => theme.mobilePageMargin};
    text-align: center;
  }
`;

const PageDescriptionText = styled.h3`
  margin-bottom: 5px;
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

  @media only screen and (max-width: ${({theme}) => theme.breakpoints.md}px) {
    justify-content: center;
    flex-direction: column;
    margin-bottom: 20px
  }
`;

const TableLabel = styled.h1`
  font: ${({theme}) => theme.fonts.bold36};
  font-style: italic;
`;

const ButtonContainer = styled.div`
  &>* {
    margin-right: 20px;
    margin-top: 10px;
    @media only screen and (max-width: ${({theme}) => theme.breakpoints.md}px) {
      margin-right: 0;
    }
  }
`;

const headers = [
  {id: 'name', value: mainCopies.SPONSOR_NAME_COLUMN}, 
  {id: 'lastUpdated', value: mainCopies.SPONSOR_LAST_UPDATED_COLUMN}, 
  {id: 'tier', value: mainCopies.SPONSOR_LEVEL_COLUMN}
]

const RowComponent = ({name, lastUpdated, tier}) => (
  <>
    <TableCell>
      <TextBold>{name}</TextBold>
    </TableCell>
    <TableCell>
      <Text>{lastUpdated}</Text>
    </TableCell>
    <TableCell>
      <Text>{tier}</Text>
    </TableCell>
  </>
)

const SponsorsPage = () => {
  const { sponsorTiers, sponsors } = useSponsors();
  const tableRows = sponsors.map((sponsor) => {
    return {
      id: sponsor.sponsorId,
      name: sponsor.name,
      lastUpdated: sponsor.lastUpdated,
      tier: sponsorTiers.filter((sTier) => sTier.id === sponsor.tierId)[0].text
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
        RowComponent={RowComponent}
        onEdit={(sponsorId) => {
          history.push(`sponsors/${sponsorId}`);
        }}
      />
    </Container>
  );
}

export default SponsorsPage;