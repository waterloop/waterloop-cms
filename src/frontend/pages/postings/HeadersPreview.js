import React from 'react';
import styled from 'styled-components';
import UnstyledButton from '../../components/Button';
import { Link } from 'react-router-dom';

const Description = styled.div`
  font: ${({ theme }) => theme.fonts.medium24};
  color: #2b2b2b;
`;

const Button = styled(UnstyledButton)`
  margin-right: 8px;
`;

const Container = styled.div``;

const HeadersPreview = ({ className, header, editDescriptionUrl }) => (
  <Container className={className}>
    <Description>{header}</Description>
    <Link to={editDescriptionUrl}>
      <Button secondary>Edit description</Button>
    </Link>
    <Button>Preview</Button>
  </Container>
);

export default HeadersPreview;
