import React from 'react';
import PostingPreview from './PostingsPreview';
import usePostings from './postings';
import HeaderPreview from './HeadersPreview';
import useHeaders from './headers';
import styled from 'styled-components';
import SortingVectorTop from './SortingVectorTop.svg';
import SortingVectorBottom from './SortingVectorBottom.svg';

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 70%;
`;

const Button = styled.button`
  font-weight: 700;
  font-size: 18px;
  border: none;
  border-radius: 15px;
  line-height: 23.4px;
`;

const ChartTitle = styled.div`
  position: absolute;
  margin-left: 6.11%;
  margin-top: 37.92%;
  margin-bottom: 57.47%;
  font-family: IBM Plex Sans;
  font-style: italic;
  font-weight: bold;
  font-size: 36px;
  line-height: 47px;
  color: #2B2B2B;
`;

const NewOpeningButton = styled(Button)`
  background-color: #FED95A;
  color: #1A1A1A;
  height: 36px;
  width: 169px;
  position: absolute;
  margin-left: 83.4%;
  margin-right: 4.86%;
  margin-top: 36.74%;
  margin-bottom: 59.72%;
`;

const ChartColumn = styled.div`
  width: 90%;
  height: 60px;
  margin-left: 6.11%;
  font-family: IBM Plex Sans;
  font-size: 18px;
  line-height: 23.4px;
  color: #000000;
  border: 2px solid #C4C4C4;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
`;

const ChartHeader = styled(ChartColumn)`
  position: relative;
  font-weight: 700;
  background: #F4F4F4;
  border-radius: 10px 10px 0px 0px;
  margin-top: 45%;
`;

const ChartHeaderText = styled.div`
  position: relative;
  width: 250px;
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
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 30px;
`;

const SortingIcon = styled.div`
  display: flex;
  flex-direction: column;
`;

const SortingTop = styled.img`
  margin-left: 100px;
  margin-bottom: 2px;
`;

const SortingBottom = styled.img`
  margin-left: 100px;
`;

const PostingsPage = () => {
  const { posting, editPosting } = usePostings();
  const { header, editHeader } = useHeaders();

  const handleEditPosting = (id) => () => {
    console.log(`Edit the Posting with id ${id}`);
  };

  const handleEditHeader = (id) => () => {
    console.log(`Edit the Header with id ${id}`);
  };

  const postingItems = posting.map(
    (posting) => <PostingPreview key={posting.id} onEdit={handleEditPosting(posting.id)} {...posting} />);

  const headerItems = header.map(
    (header) => <HeaderPreview key={header.id} onEdit={handleEditHeader(header.id)} {...header} />);

  return (
    <div>
      {headerItems}
      <Column>
        <ChartTitle>Team Openings</ChartTitle>
        <NewOpeningButton>New Opening +</NewOpeningButton>
        <ChartHeader>
          <ChartHeaderText>
            Opening Role
            <SortingIcon>
              <SortingTop src={SortingVectorTop} alt=" " />
              <SortingBottom src={SortingVectorBottom} alt=" " />
            </SortingIcon>
          </ChartHeaderText>
          <ChartHeaderText>
            Subteam
            <SortingIcon>
              <SortingTop src={SortingVectorTop} alt=" " />
              <SortingBottom src={SortingVectorBottom} alt=" " />
            </SortingIcon>
          </ChartHeaderText>
          <ChartHeaderText>
            Last updated
            <SortingIcon>
              <SortingTop src={SortingVectorTop} alt=" " />
              <SortingBottom src={SortingVectorBottom} alt=" " />
            </SortingIcon>
          </ChartHeaderText>
          <ChartHeaderText>
            Opening status
            <SortingIcon>
              <SortingTop src={SortingVectorTop} alt=" " />
              <SortingBottom src={SortingVectorBottom} alt=" " />
            </SortingIcon>
          </ChartHeaderText>
        </ChartHeader>
        {postingItems}
      </Column>
    </div>
  );
};

export default PostingsPage;
