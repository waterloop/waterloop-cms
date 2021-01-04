import React from 'react';
import PostingPreview from './PostingsPreview';
import usePostings from './hooks/postings';
import UnstyledHeaderPreview from './HeadersPreview';
import useHeaders from './hooks/headers';
import styled from 'styled-components';
import SortingVectorTop from './assets/SortingVectorTop.svg';
import SortingVectorBottom from './assets/SortingVectorBottom.svg';
import Button from '../../components/Button';

import MUITable from '@material-ui/core/Table';
import MUITableBody from '@material-ui/core/TableBody';
import MUITableCell from '@material-ui/core/TableCell';
import MUITableRow from '@material-ui/core/TableRow';
import MUITableContainer from '@material-ui/core/TableContainer';
import MUITableHead from '@material-ui/core/TableHead';

const Table = styled(MUITable)``;
const TableBody = styled(MUITableBody)``;
const TableCell = styled(MUITableCell)``;
const TableRow = styled(MUITableRow)``;
const TableContainer = styled(MUITableContainer)``;

const TableHead = styled(MUITableHead)`
  background: #F4F4F4;
`;

const Chart = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 70%;
  border: 2px solid #C4C4C4;
  border-radius: 10px 10px 0px 0px;
`;

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

const ChartHeaderText = styled.div`
  position: relative;
  height: 24px;
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #000000;
`;

const SortingIcon = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;

const SortingTop = styled.img`
  width: 12px;
  margin-bottom: 2px;
`;

const SortingBottom = styled.img`
  width: 12px;
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

  const handleEditPosting = (id) => () => {
    console.log(`Edit the Posting with id ${id}`);
  };

  const handleEditHeader = (id) => () => {
    console.log(`Edit the Header with id ${id}`);
  };

  const postingItems = postings.map(
    (posting) => <PostingPreview key={posting.id} onEdit={handleEditPosting(posting.id)} {...posting} />);

  const headerItems = headers.map(
    (header) => <HeaderPreview key={header.id} onEdit={handleEditHeader(header.id)} {...header} />);

  return (
    <Container>
      {headerItems}
      <NewOpeningButton>New Opening +</NewOpeningButton>
      <ChartTitle>Team Openings</ChartTitle>
      <TableContainer component={Chart}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <ChartHeaderText>
                  Opening Role
                  <SortingIcon>
                    <SortingTop src={SortingVectorTop} alt=" " />
                    <SortingBottom src={SortingVectorBottom} alt=" " />
                  </SortingIcon>
                </ChartHeaderText>
              </TableCell>
              <TableCell>
                <ChartHeaderText>
                  Subteam
                  <SortingIcon>
                    <SortingTop src={SortingVectorTop} alt=" " />
                    <SortingBottom src={SortingVectorBottom} alt=" " />
                  </SortingIcon>
                </ChartHeaderText>
              </TableCell>
              <TableCell>
                <ChartHeaderText>
                  Last updated
                  <SortingIcon>
                    <SortingTop src={SortingVectorTop} alt=" " />
                    <SortingBottom src={SortingVectorBottom} alt=" " />
                  </SortingIcon>
                </ChartHeaderText>
              </TableCell>
              <TableCell>
                <ChartHeaderText>
                  Opening status
                  <SortingIcon>
                    <SortingTop src={SortingVectorTop} alt=" " />
                    <SortingBottom src={SortingVectorBottom} alt=" " />
                  </SortingIcon>
                </ChartHeaderText>
              </TableCell>
              <TableCell>
                <ChartHeaderText /> {/* Place holder column for the edit button */}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {postingItems}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default PostingsPage;
