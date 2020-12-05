import React from 'react'
import PostingPreview from './PostingsPreview'
import usePostings from './postings'
import styled from 'styled-components';
import SortingVectorTop from './SortingVectorTop.svg'
import SortingVectorBottom from './SortingVectorBottom.svg'

const FirstDescription = styled.div`
  position: absolute;
  margin-left: 6.11%;
  margin-right: 51.94%;
  margin-top: 12.57%;
  margin-bottom: 84.28%;
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 31px;
  color: #2B2B2B;
`;

const Button = styled.button`
  font-weight: 700;
  font-size: 18px;
  border: none;
  border-radius: 15px;
  line-height: 23.4px
`;

const FirstPreviewButton = styled(Button)`
  height: 27px;
  width: 113px;
  color: #1A1A1A;
  background-color: #FED95A;
  position: absolute;
  margin-left: 20.35%;
  margin-right: 71.81%;
  margin-top: 16.9%;
  margin-bottom: 80.45%;
`;

const FirstEditButton = styled(Button)`
  background-color: #1A1A1A;
  color: #FED95A;
  height: 27px;
  width: 177px;
  position: absolute;
  margin-left: 6.11%;
  margin-right: 81.6%;
  margin-top: 16.9%;
  margin-bottom: 80.45%;
`;

const SecondDescription = styled.div`
  position: absolute;
  margin-left: 6.11%;
  margin-top: 22.89%;
  margin-bottom: 73.97%;
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 31px;
  color: #2B2B2B;
`;

const SecondPreviewButton = styled(Button)`
  height: 27px;
  width: 113px;
  color: #1A1A1A;
  background-color: #FED95A;
  position: absolute;
  margin-left: 20.35%;
  margin-right: 71.81%;
  margin-top: 27.21%;
  margin-bottom: 70.14%;
`;

const SecondEditButton = styled(Button)`
  background-color: #1A1A1A;
  color: #FED95A;
  height: 27px;
  width: 177px;
  position: absolute;
  margin-left: 6.11%;
  margin-right: 81.6%;
  margin-top: 27.21%;
  margin-bottom: 70.14%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 70%;
`;

const Row = styled.div`
display: flex;
flex-direction: row;
flex-basis: 70%;
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
`;

const SortingIcon = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostingsPage = () => {
  const { posting, editPosting } = usePostings();

  const handleEditPosting = (id) => () => {
    console.log(`Edit the Posting with id ${id}`);
  };
  
  const postingItems = posting.map(
    (posting) => <PostingPreview key={posting.id} onEdit={handleEditPosting(posting.id)} {...posting} />);

  return (
    <div>
      <FirstDescription>Come Join Us Today! Description</FirstDescription>
      <FirstEditButton>Edit description</FirstEditButton>
      <FirstPreviewButton>Preview</FirstPreviewButton>
      <SecondDescription>Openings Description</SecondDescription>
      <SecondEditButton>Edit description</SecondEditButton>
      <SecondPreviewButton>Preview</SecondPreviewButton>
      <Column>
        <ChartTitle>Team Openings</ChartTitle>
        <NewOpeningButton>New Opening +</NewOpeningButton>
        <ChartHeader>
          <ChartHeaderText style={{marginTop:"15px", marginBottom:"15px", marginLeft: "30px"}}>
            Opening Role
            <SortingIcon>
              <img style={{marginLeft: "100px", marginBottom: "2px"}} src={SortingVectorTop} alt="edit"/>
             <img style={{marginLeft: "100px"}} src={SortingVectorBottom} alt="edit"/>
            </SortingIcon>
          </ChartHeaderText>
          <ChartHeaderText style={{marginTop:"15px", marginBottom:"15px", marginLeft: "30px"}}>
            Subteam
            <SortingIcon>
            <img style={{marginLeft: "100px", marginBottom: "2px"}} src={SortingVectorTop} alt="edit"/>
            <img style={{marginLeft: "100px"}} src={SortingVectorBottom} alt="edit"/>
            </SortingIcon>
          </ChartHeaderText>
          <ChartHeaderText style={{marginTop:"15px", marginBottom:"15px", marginLeft: "30px"}}>
            Last updated
            <SortingIcon>
              <img style={{marginLeft: "100px", marginBottom: "2px"}} src={SortingVectorTop} alt="edit"/>
              <img style={{marginLeft: "100px"}} src={SortingVectorBottom} alt="edit"/>
            </SortingIcon>
          </ChartHeaderText>
          <ChartHeaderText style={{marginTop:"15px", marginBottom:"15px", marginLeft: "30px" }}>
            Opening status
            <SortingIcon>
              <img style={{marginLeft: "100px", marginBottom: "2px"}} src={SortingVectorTop} alt="edit"/>
              <img style={{marginLeft: "100px"}} src={SortingVectorBottom} alt="edit"/>
            </SortingIcon>
          </ChartHeaderText>
        </ChartHeader>
        {postingItems}
      </Column>
    </div>
  )
}

export default PostingsPage;
