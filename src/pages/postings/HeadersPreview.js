import React from 'react';
import styled from 'styled-components';
import UnstyledButton from '../../components/Button';

const Description = styled.div`
  font: ${({ theme }) => theme.fonts.medium24};
  color: #2B2B2B;
`;

const Button = styled(UnstyledButton)`
  margin-right: 8px;
`;

const Container = styled.div``;

const HeadersPreview = ({
  className,
  header,
}) => (
  <Container className={className}>
    <Description>{header}</Description>
    <Button secondary>Edit description</Button>
    <Button>Preview</Button>
  </Container>
);

export default HeadersPreview;
