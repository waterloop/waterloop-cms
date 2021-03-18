import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { sponsorsCopies } from './Copies';

import FormContainer from '../../../components/FormContainer';
import TextInput from '../../../components/TextInput';
import Selector from '../../../components/Selector';
import Button from '../../../components/Button';
import ImagePreview from '../../../components/ImagePreview';

import Grid from '@material-ui/core/Grid';


const Container = styled.div`
  margin: ${({ theme }) => theme.pageMargin};
`;

const GridContainer = styled(Grid)`
  padding-bottom: 16px;
`

/** Uses Grids for responsive design. */
const EditSponsors = () => {
  const { params: { id } } = useRouteMatch();

  return (
    <Container id="sponsor-root">
      <Button cancel onClick={() => {}}>
        &#60; Back
      </Button>
      <FormContainer title={sponsorsCopies.NAME_LABEL}>
        <TextInput placeholder={sponsorsCopies.NAME_PLACEHOLDER}/>
      </FormContainer>
      <FormContainer title={sponsorsCopies.WEBSITE_LABEL}>
        <TextInput placeholder={sponsorsCopies.WEBSITE_PLACEHOLDER} />
      </FormContainer>
      <FormContainer title={sponsorsCopies.TIER_LABEL}>
        <Selector value={0} items={[]} onSelect={() => {}} placeholder={sponsorsCopies.TIER_PLACEHOLDER} />
      </FormContainer>
      <FormContainer title={sponsorsCopies.START_DATE_LABEL}>
        <Selector value="" items={[]} onSelect={() => {}} />
        <Selector value="" items={[]} onSelect={() => {}} />
      </FormContainer>
      <FormContainer title={sponsorsCopies.CONTRIBUTIONS_LABEL}>
        <TextInput multiLine />
      </FormContainer>
      <FormContainer title={sponsorsCopies.LOGO_LABEL}>
        <ImagePreview />
      </FormContainer>
      <FormContainer title={sponsorsCopies.VIDEO_LINK_LABEL}>
        <TextInput />
      </FormContainer>      
    </Container>
  );
}

export default EditSponsors;