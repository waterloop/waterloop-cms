import React from 'react';
import styled from 'styled-components';
import MockData from './MockData';
import Add from './assets/add.svg';
import Edit from './assets/edit.svg';
import SortUp from './assets/SortUp.svg';
import SortDown from './assets/SortDown.svg';

const PageName = styled.div`
    font-weight: 500;
    font-size: 22px;
    margin-left: 10%;
    margin-bottom: 20px;
`;

const OuterContainer = styled.div`
 font-family: 'IBM Plex Sans';
`;

const Spann = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50%;
    h2{
        font-size: 18px;
        padding-left: 30px;
    }
    .date{
        font-size: 15px;
        padding-left: 5px;
    }
    @media (max-width: 768px) {
        h2{
        font-size: 14px;
        padding-left: 5px;
    }
    .date{
        font-size: 12px;
        padding-left: 5px;
    }
  }
    @media (max-width: 411) {
        width: 60%;
        h2{
        font-size: 10px;
        padding-left: 5px;
    }
    .date{
        font-size: 11px;
        padding-left: 5px;
    }
  }
`;

const ListSpan = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 40%;
    h2{
        font-size: 18px;
        padding-left: 30px;
        margin-left: 30px;
    }
    .date{
        font-size: 15px;
        padding-left: 5px;
    }
    @media (max-width: 1030px) {
        width: 57%;
    }
    @media (max-width: 768px) {
        h2{
        font-size: 14px;
        padding-left: 5px;
    }
    .date{
        font-size: 12px;
        padding-left: 5px;
    }
  }
    @media (max-width: 411) {
        width: 60%;
        h2{
        font-size: 10px;
        padding-left: 5px;
    }
    .date{
        font-size: 11px;
        padding-left: 5px;
    }
  }
`;

const ButtonSpan = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 20%;
    margin-left: 10%;
    margin-bottom: 20px;
    h2{
        font-size: 18px;
        padding-left: 5px;
    }
    .date{
        font-size: 15px;
        padding-left: 5px;
    }
    @media (max-width: 1024px) {
        width: 40%;
  }
    @media (max-width: 607px) {
        width: 45%;
  }
    @media (max-width: 540px) {
        width: 50%;
  }
`;

const Container = styled.div`
    font-family: 'IBM Plex Sans';
    padding: 0;
    margin: 0;
    width: 80%;
    margin-left: 10%;
    color: #2B2B2B;
    text-align: center;
    h1{
        font-style:italic;
        padding-bottom: 0;
        margin-bottom: 0;
    };
    h3{
        font-style:none;
        padding-bottom: 0;
        margin-bottom: 0;
    }
`;

const InnerContainer = styled.div`
    border: 2px solid #C4C4C4;
    border-radius: 10px 10px 0px 0px;
`;

const OuterSpan = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    button{
        border: none;
        cursor: pointer;
        border: 1px solid #FED95A;
        border-radius: 15px;
        text-align: center;
        font-family: IBM Plex Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 15px;
        display: flex;
        align-items: center;
        color: #2B2B2B;
    }
    h1{
        padding-bottom: 20px;
    }
`;

const TeamButton = styled.button`
    background: #FED95A;
    border-radius: 15px;
    display: flex;
    padding: 0 0.5rem;
    img{
        width: 25%;
    };
    text-align: center;font-family: IBM Plex Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 15px;
        line-height: 23px;
        display: flex;
        align-items: center;
        color: #2B2B2B;
        border: 1px solid #FED95A;
`;

const EditDescButton = styled.button`
    background: #1A1A1A;
    border-radius: 15px;
    color: #fed95a;
    text-align: center;
    font-family: IBM Plex Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 13px;
    line-height: 23px;
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    @media (max-width: 768px) {
        margin-right: 50px;
  }
`;

const Table = styled.div`
    border-radius: 10px 10px 0px 0px;
    padding: 0;
    font-size: 13px;
    font-weight: bold;
    background: #F4F4F4;
`;

const SortingIcons = styled.div`
  display: flex;
  flex-direction: column;
`;

const SortingUp = styled.img`
  margin-left: 100px;
  margin-bottom: 2px;
`;

const SortingDown = styled.img`
  margin-left: 100px;
`;

const EditButton = styled.button`
  margin-right: 5px;
`;

const EditIcon = styled.img`
    padding-left: 7px;
    width: 12px;
`;

const ChartHeaderText = styled.div`
  position: relative;
  width: 250px;
  height: 24px;
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 23px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #000000;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 30px;
  white-space: nowrap;
`;

const Border = styled.div`
    outline: 2px solid #C4C4C4;
`;

const TeamDescriptionsPage = () => {
  const list = MockData();
  return (
    <OuterContainer>
      <PageName>
        Teams Page Description
      </PageName>
      <ButtonSpan>
        <EditDescButton>Edit description</EditDescButton>
        <TeamButton>Preview</TeamButton>
      </ButtonSpan>
      <Container>
        <OuterSpan>
          <h1>All Teams</h1>
          <TeamButton>
            AddTeam
            <EditIcon src={Add} alt="+" />
          </TeamButton>
        </OuterSpan>
        <InnerContainer>
          <Table>
            <Spann>
              <ChartHeaderText>
                <h2>Team</h2>
                <SortingIcons>
                  <SortingUp src={SortUp} alt="up" />
                  <SortingDown src={SortDown} alt="down" />
                </SortingIcons>
              </ChartHeaderText>
              <ChartHeaderText>
                <h2>Last Updated</h2>
                <SortingIcons>
                  <SortingUp src={SortUp} alt="edit" />
                  <SortingDown src={SortDown} alt="edit" />
                </SortingIcons>
              </ChartHeaderText>
            </Spann>
          </Table>
          {list.map((item) => (
            <Border>
              <OuterSpan>
                <ListSpan>
                  <h2>{item.teamName}</h2>
                  <div className="date">{item.lastUpdated}</div>
                </ListSpan>
                <EditButton >
                  Button
                  <EditIcon src={Edit} alt="edit" />
                </EditButton>
              </OuterSpan>
            </Border>
          ))}
        </InnerContainer>
      </Container>
    </OuterContainer>
  );
};

export default TeamDescriptionsPage;
