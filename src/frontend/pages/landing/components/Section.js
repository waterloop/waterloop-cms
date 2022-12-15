import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import MUITypography from '@mui/material/Typography';
import EDITSVG from './assets/edit.svg';
import PreviewSVG from './assets/preview.svg';

const EditIcon = styled.img.attrs({
  src: EDITSVG,
})`
  cursor: pointer;
`;

const PreviewIcon = styled.img.attrs({
  src: PreviewSVG,
})`
  cursor: pointer;
`;

const IconRow = styled.div`
  display: flex;
`;

const PageIcon = styled.img`
  height: 113px;
  width: 113px;
`;

const Container = styled.div`
  border: ${({ theme }) => theme.borders.solidGrey1};
  border-radius: 15px;

  -webkit-box-shadow: 9px 9px 6px -2px rgba(201, 201, 201, 1);
  -moz-box-shadow: 9px 9px 6px -2px rgba(201, 201, 201, 1);
  box-shadow: 9px 9px 6px -2px rgba(201, 201, 201, 1);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  padding-right: calc(min(180px, 30%));
  padding-left: calc(min(180px, 30%));
`;

const PageTitle = styled(MUITypography)`
  font: ${({ theme }) => theme.fonts.bold24};
  text-align: center;
`;

const Section = ({ name, editLink, previewLink, icon, className }) => {
  const history = useHistory();
  const handleNavClick = useCallback(
    (site, external = false) => () => {
      if (external) {
        window.location.href = site;
      } else {
        history.push(site);
      }
    },
    [history],
  );

  return (
    <Container className={className}>
      <PageIcon src={icon} />
      <PageTitle>{name}</PageTitle>
      <IconRow>
        <EditIcon onClick={handleNavClick(editLink)} />
        <PreviewIcon onClick={handleNavClick(previewLink, true)} />
      </IconRow>
    </Container>
  );
};

export default Section;
