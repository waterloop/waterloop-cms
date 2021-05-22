import React from 'react';
import styled from 'styled-components';

const OuterContainer = styled.div`
  font-family: 'IBM Plex Sans';
  margin: ${(props) => props.theme.pageMargin};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const NotFound = styled.h1`


`

const NotFoundPage = () => {
    return (
        <OuterContainer>
          <NotFound>
            404 Page Not Found
          </NotFound>
        </OuterContainer>
    ) 
}

export default NotFoundPage;