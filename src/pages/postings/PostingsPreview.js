import React from 'react';
import styled from 'styled-components';
import EditIcon from './EditIcon.svg';
import OptionsVector from './OptionsVector.svg';

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
  margin-top: 25px; 
  margin-bottom: 25px;
  margin-left: 30px;
  margin-right: 50px;
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
  margin-top: 25px; 
  margin-bottom: 25px;
  margin-left: 30px;
  margin-right: 50px;
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
  margin-top: 15px; 
  margin-bottom: 15px;
  margin-left: 30px;
  margin-right: 50px;
`;

const OptionsIcon = styled.img`
  margin-left: 35px;
`;

const EditButton = styled(Button)`
  width: 89px;
  height: 36px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #FED95A;
  margin-top: 15px; 
  margin-left: 80px;
  margin-right: 30px;
`;

const EditButtonText = styled.div`
  margin-left: 12px;
`;


const EditButtonIcon = styled.img`
  padding-left: 8px;
`;

const PostingsPreview = ({
  openingRole,
  subteam,
  lastUpdated,
  openingStatus
}) => (
  <ChartColumn>
    <ChartInfoText>{openingRole}</ChartInfoText>
    <ChartInfoText>{subteam}</ChartInfoText>
    <LastUpdatedText>{lastUpdated}</LastUpdatedText>
    <StatusBorder>
      {openingStatus}
      <OptionsIcon src={OptionsVector} alt="edit"/>
    </StatusBorder>
    <EditButton>
      <EditButtonText>Edit</EditButtonText>
      <EditButtonIcon src={EditIcon} alt="edit"/>
    </EditButton>
  </ChartColumn>
    );
  

export default PostingsPreview;