import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom'
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid black;
  border-radius: 4px;

  -webkit-box-shadow: 9px 9px 6px -2px rgba(201,201,201,1);
  -moz-box-shadow: 9px 9px 6px -2px rgba(201,201,201,1);
  box-shadow: 9px 9px 6px -2px rgba(201,201,201,1);

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
`;

const Section = ({
  name,
  to,
  className
}) => {
  const history = useHistory();

  const handleClick = useCallback(() => {
    history.push(to);
  }, [history, to]);

  return (
    <Container className={className} onClick={handleClick}>
      <h2>{name}</h2>
    </Container>
  );
};

export default Section;
