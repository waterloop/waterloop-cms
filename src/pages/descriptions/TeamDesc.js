import React,{useState} from 'react';
import styled from 'styled-components'
import MockData from './MockData';

const Spann = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Container = styled.div`
    font-family: 'IBM Plex Sans';
    width: 29%;
    margin-left: 10%;
    color: #2B2B2B;
    h1{
        font-style:italic;
        padding-bottom: 0;
        margin-bottom: 0;
    }
`

function TeamDesc(){
    const [list, setList] = useState(MockData());
    
    return(
    <Container>
        <h1>All Teams</h1>
        {list.map(item =>{
                return(
                <Spann>
                    <h2>{item.teamName}</h2> 
                    <div>{item.lastUpdated}</div>
                    
                </Spann>)}
                )}
    </Container>
    )
}

export default TeamDesc;