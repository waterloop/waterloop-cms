import React from 'react';
import styled from 'styled-components'
import MockData from './MockData';
import Add from './add.svg'
import Edit from './edit.svg'
import ToggleUp from './up.svg'
import ToggleDown from './down.svg'

const OuterContainer = styled.div`
 font-family: 'IBM Plex Sans';   
`

const Spann = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 35%;
    h2{
        font-size: 18px;
        padding-left: 5px;
    }
    .date{
        font-size: 15px;
        padding-left: 5px;
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
`

const InnerContainer = styled.div`
    border: 2px solid #C4C4C4;
    border-radius: 10px 10px 0px 0px;
`

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
`
const TeamButton = styled.button`
    background: #FED95A;
    border-radius: 15px;
    display: flex;
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
`
const EditDescButton = styled.button`
    background: #1A1A1A;
    border-radius: 15px;
    color: #fed95a;
    text-align: center;font-family: IBM Plex Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 13px;
    line-height: 23px;
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
`
const Border = styled.div`
    border:0;
    border: 1px solid #C4C4C4;
`

const Table = styled.div`
    border-radius: 10px 10px 0px 0px;
    padding: 15px 0;
    font-size: 13px;
    font-weight: bold;
    background: #F4F4F4;
`

function TeamDesc(){
    const list = MockData();
    const Length = list.length
    return(
        <OuterContainer>
                <div style={{fontWeight:"500",fontSize:"22px",marginLeft:"10%", marginBottom:"20px"}}>
                    Teams Page Description
                </div>

            <Spann style={{marginLeft:"10%", marginBottom:"20px", width:"20%"}}>
                <EditDescButton>Edit description</EditDescButton>
                <TeamButton style={{padding:"0 0.5rem"}}>Preview</TeamButton>
            </Spann>
        <Container>
            <OuterSpan>
                <h1 style={{paddingBottom:"5px"}}>All Teams</h1>
                <TeamButton>
                    AddTeam
                    <img style={{paddingLeft:"7px",width:"12px"}} src={Add} alt="+"/>
                </TeamButton>
            </OuterSpan>


            <InnerContainer>
                <Table style={{padding:"0"}}>
                    <Spann style={{width:"40%"}}>
                        <div style={{display:"flex"}}>
                            <h2>Team</h2>
                            <div style={{display:"flex",flexDirection:"column", margin:"20px 0"}}>
                                <img style={{paddingLeft:"7px",width:"12px"}} src={ToggleUp} alt="edit"/>
                                <img style={{paddingLeft:"7px",width:"12px"}} src={ToggleDown} alt="edit"/>
                            </div>
                        </div>
                        <div style={{display:"flex"}}>
                            <h2>Last Updated</h2>
                            <div style={{display:"flex",flexDirection:"column", margin:"20px 0"}}>
                                <img style={{paddingLeft:"7px",width:"12px"}} src={ToggleUp} alt="edit"/>
                                <img style={{paddingLeft:"7px",width:"12px"}} src={ToggleDown} alt="edit"/>
                            </div>
                        </div>
                    </Spann>
                </Table>
                {list.map((item,index) =>{
                        return(
                            <div style={{outline: "2px solid #C4C4C4"}}>
                        <OuterSpan>
                        <Spann>
                            <h2>{item.teamName}</h2> 
                            <div className="date">{item.lastUpdated}</div>
                            
                        </Spann>
                        <button style={{marginRight:"5px"}}>
                            Button
                            <img style={{paddingLeft:"7px",width:"12px"}} src={Edit} alt="edit"/>
                        </button>
                        </OuterSpan>
                        {(Length !== index + 1 ? <Border/> : null)}
                        </div>)}
                        )}
            </InnerContainer>
        </Container>
    </OuterContainer>
    )
}

export default TeamDesc;