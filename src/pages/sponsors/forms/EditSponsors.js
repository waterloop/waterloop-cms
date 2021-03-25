import React from 'react';
import useSponsorForm from '../hooks/sponsor-form';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { sponsorsCopies } from './Copies';

import UnstyledFormContainer from '../../../components/FormContainer';
import UnstyledTextInput from '../../../components/TextInput';
import UnstyledSelector from '../../../components/Selector';
import Button from '../../../components/Button';
import UnstyledImagePreview from '../../../components/ImagePreview';

const Container = styled.div`
  margin: ${({ theme }) => theme.pageMargin};
  & input, textarea {
    box-sizing: border-box;
  }
  @media only screen and (max-width: 958px) {
    margin: ${({ theme }) => theme.mobilePageMargin};
  }
`;

const FormGroup = styled.div`
  &>* {
    margin-bottom: 20px;
    
    &:last-child {
      margin-bottom: 40px;
    }
  }
`;

const FormContainer = styled(UnstyledFormContainer)`
  max-width: initial;
`;

const TopInfo = styled.span`
  display: flex;
  flex-direction: row;

  justify-content: space-between;

  & button {
    padding: 0;
  }
`;

const InlineSpaced = styled.span`
  display: flex;
  flex-direction: row;

  &>* {
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

const TextInput = styled(UnstyledTextInput)`
  max-width: 500px;
  width: 100%;
`;

const TextMultilineInput = styled(UnstyledTextInput)`
  width: 100%;
`;

const Selector = styled(UnstyledSelector)`
  max-width: 250px;
  width: 100%;
`;

const NarrowSelector = styled(UnstyledSelector)`
  max-width: 135px;
  width: 100%;
`;

const ImagePreview = styled(UnstyledImagePreview)`
  max-width: 256px;
  width: auto;
`

// TODO: Abstract component as utility for forms:
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

/** Uses Grids for responsive design. */
const EditSponsors = () => {
  const { params: { id } } = useRouteMatch();
  
  const {
    loading,
    terms,
    years,
    sponsorTiers,

    name,
    website,
    tierId,
    termSeason,
    termYear,
    description,
    logoStr,
    logoFile,
    videoLink,

    updateName,
    updateWebsite,
    updateTierId,
    updateTermSeason,
    updateTermYear,
    updateDescription,
    updateLogo,
    updateVideoLink,

    saveForm
  } = useSponsorForm(parseInt(id));
  return (
    !loading && <Container id="sponsor-root">
      <TopInfo>
        <Button cancel onClick={() => {}}>
          &#60; Back
        </Button>
        <p>
          Last updated on something
        </p>
      </TopInfo>
      <FormGroup>
        <FormContainer title={sponsorsCopies.NAME_LABEL}>
          <TextInput 
            placeholder={sponsorsCopies.NAME_PLACEHOLDER} 
            value={name}
            onChange={updateName}
          />
        </FormContainer>
        <FormContainer title={sponsorsCopies.WEBSITE_LABEL}>
          <TextInput 
            placeholder={sponsorsCopies.WEBSITE_PLACEHOLDER} 
            value={website}
            onChange={updateWebsite} 
          />
        </FormContainer>
        <FormContainer title={sponsorsCopies.TIER_LABEL}>
          <Selector value={tierId} items={sponsorTiers} onSelect={updateTierId} placeholder={sponsorsCopies.TIER_PLACEHOLDER} />
        </FormContainer>   
        <FormContainer title={sponsorsCopies.START_DATE_LABEL}>
          <InlineSpaced>
            <NarrowSelector value={termSeason} items={terms} onSelect={updateTermSeason} placeholder={sponsorsCopies.START_DATE_TERM_PLACEHOLDER} />  
            <NarrowSelector value={termYear} items={years} onSelect={updateTermYear} placeholder={sponsorsCopies.START_DATE_YEAR_PLACEHOLDER} />
          </InlineSpaced>
        </FormContainer>
        <FormContainer title={sponsorsCopies.CONTRIBUTIONS_LABEL}>
          <TextMultilineInput 
            multiLine 
            placeholder={sponsorsCopies.CONTRIBUTIONS_PLACEHOLDER}
            value={description}
            onChange={updateDescription}   
          />
        </FormContainer>
        <FormContainer title={sponsorsCopies.LOGO_LABEL}>
          <ImagePreview
            // Use local image file if user uploaded new image,
            // else use existing image URL.
            src={logoFile ? window.URL.createObjectURL(logoFile) : logoStr}
            onNew={(file) => {
              console.log(file);
              updateLogo(file.name, file);
            }}
            onDelete={() => {
              updateLogo('', null);
            }}
          />
        </FormContainer>
        <FormContainer title={sponsorsCopies.VIDEO_LINK_LABEL}>
          <TextInput 
            placeholder={sponsorsCopies.VIDEO_LINK_PLACEHOLDER} 
            value={videoLink}
            onChange={updateVideoLink}
          />
        </FormContainer>
      </FormGroup>
      <ButtonContainer>
        <div>
          <Button onClick={saveForm}>Save</Button>
          <Button cancel onClick={() => {}}>Cancel</Button>
        </div>
        <Button del onClick={() => {}}>Delete</Button>
      </ButtonContainer>
    </Container>
  );
}

export default EditSponsors;