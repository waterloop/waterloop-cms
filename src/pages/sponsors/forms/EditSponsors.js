import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  margin: ${({ theme }) => theme.pageMargin};
`;

const EditSponsors = () => {
  const { params: { id } } = useRouteMatch();

  return (
    <Container id="sponsor-root">
      {`id is ${id}`}
      
    </Container>
  );
}

export default EditSponsors;