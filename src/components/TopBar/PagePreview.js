import React from 'react';
import styled from 'styled-components';
import MUITypography from '@material-ui/core/Typography';

const Typography = styled(MUITypography)`
  font: ${({ theme }) => theme.fonts.bold14};
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const Icon = styled.img``;

const PagePreview = ({
  pageName, icon, onClick, className,
}) => (
    <Container className={className} onClick={onClick}>
      <Icon src={icon} alt="Page Icon" />
      <Typography>{pageName}</Typography>
    </Container>
);

export default PagePreview;
