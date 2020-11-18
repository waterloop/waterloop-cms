import React from 'react';
import styled from 'styled-components'
import MockData from './MockData';
import Add from './add.svg'
import Edit from './edit.svg'

const Spann = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 25%;
`;

const Container = styled.div`
    font-family: 'IBM Plex Sans';
    width: 80%;
    margin-left: 10%;
    color: #2B2B2B;
    text-align: center;
    h1{
        font-style:italic;
        padding-bottom: 0;
        margin-bottom: 0;
    }
`

const OuterSpan = styled.span`
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    button{
        border: none;
        cursor: pointer;
        border: 1px solid #FED95A;
        padding: 0 0.5rem;
        transition: all 0.3s ease;
        &:hover{
            background: rgb(189, 181, 181);
        };
        border-radius: 15px;
        text-align: center;font-family: IBM Plex Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 15px;
        line-height: 23px;
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
    }
`

function TeamDesc(){
    const list = MockData();
    
    return(
    <Container>
        <OuterSpan>
        <h1>All Teams</h1>
        <TeamButton>
            AddTeam
            <img style={{paddingLeft:"7px",width:"12px"}} src={Add} alt="+"/>
        </TeamButton>
        </OuterSpan>
        {list.map(item =>{
                return(
                <OuterSpan>
                <Spann>
                    <h2>{item.teamName}</h2> 
                    <div>{item.lastUpdated}</div>
                    
                </Spann>
                <button>
                    Button
                    <img style={{paddingLeft:"7px",width:"12px"}} src={Edit} alt="edit"/>
                </button>
                </OuterSpan>)}
                )}
    </Container>
    )
}

export default TeamDesc;