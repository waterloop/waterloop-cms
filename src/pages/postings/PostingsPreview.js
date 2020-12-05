import React from 'react';
import styled from 'styled-components';
import EditIcon from './EditIcon.svg'
import OptionsVector from './OptionsVector.svg'

const ChartColumn = styled.div`
  width: 90%;
  height: 80px;
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

const ChartInfoText = styled.div`
  position: relative;
  width: 200px;
  height: 24px;
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 23px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #2B2B2B;
`;

const LastUpdatedText = styled.div`
  position: relative;
  width: 200px;
  height: 24px;
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 23px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #2B2B2B;
`;

const Button = styled.button`
  position: relative;
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 23px;
  display: flex;
  flex-direction: row;
  background-color: white;
  color: #2B2B2B;
  box-sizing: border-box;
  border-radius: 15px;
`;

const StatusBorder = styled(Button)`
  width: 250px;
  height: 47.13px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #C4C4C4;
`;

const EditButton = styled(Button)`
  width: 89px;
  height: 36px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #FED95A;
`;

const PostingsPreview = ({
  openingRole,
  subteam,
  lastUpdated,
  openingStatus
}) => (
  <ChartColumn>
    <ChartInfoText style={{marginTop:"25px", marginBottom:"25px", marginLeft: "30px", marginRight: "50px"}}>{openingRole}</ChartInfoText>
    <ChartInfoText style={{marginTop:"25px", marginBottom:"25px", marginLeft: "30px", marginRight: "50px"}}>{subteam}</ChartInfoText>
    <LastUpdatedText style={{marginTop:"25px", marginBottom:"25px", marginLeft: "30px", marginRight: "50px"}}>{lastUpdated}
    </LastUpdatedText>
    <StatusBorder style={{marginTop:"15px", marginBottom:"15px", marginLeft: "30px", marginRight: "50px"}}>
      {openingStatus}
      <img style={{marginLeft: "35px"}} src={OptionsVector} alt="edit"/>
    </StatusBorder>
    <EditButton style={{marginTop:"15px", marginLeft: "80px", marginRight: "30px"}}>
      <div style={{marginLeft:"12px"}}>Edit</div>
      <img style={{paddingLeft:"8px"}} src={EditIcon} alt="edit"/>
    </EditButton>
  </ChartColumn>
    );
  

export default PostingsPreview;