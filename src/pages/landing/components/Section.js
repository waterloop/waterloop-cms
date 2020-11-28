import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import MUITypography from '@material-ui/core/Typography';
import EDITSVG from './assets/edit.svg';
import PreviewSVG from './assets/preview.svg';

const EditIcon = styled.img.attrs({
  src: EDITSVG,
})``;

const PreviewIcon = styled.img.attrs({
  src: PreviewSVG,
})``;

const IconRow = styled.div`
  display: flex;
`;

const PageIcon = styled.img`
  height: 113px;
  width: 113px;
`;

const Container = styled.div`
  border: 1px solid black;
  border-radius: 4px;

  -webkit-box-shadow: 9px 9px 6px -2px rgba(201,201,201,1);
  -moz-box-shadow: 9px 9px 6px -2px rgba(201,201,201,1);
  box-shadow: 9px 9px 6px -2px rgba(201,201,201,1);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  padding-right: 64px;
  padding-left: 64px;
`;

const PageTitle = styled(MUITypography)`
  font: ${({ theme }) => theme.fonts.bold24};
  text-align: center;
`;

const Section = ({
  name,
  editLink,
  previewLink,
  icon,
  className,
}) => {
  const history = useHistory();
  const handleNavClick = useCallback((site, external = false) => () => {
    if (external) {
      window.location.href = site;
    } else {
      history.push(site);
    }
  }, [history, editLink]);

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
