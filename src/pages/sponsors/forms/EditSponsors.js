import React, {useState} from 'react';
import useSponsorForm from '../hooks/sponsor-form';
import { useRouteMatch } from 'react-router-dom';

import styled from 'styled-components';
import { commonCopies, sponsorsCopies, buttonCopies } from '../Copies';

import UnstyledFormContainer from '../../../components/FormContainer';
import UnstyledTextInput from '../../../components/TextInput';
import UnstyledSelector from '../../../components/Selector';
import Button from '../../../components/Button';
import UnstyledImagePreview from '../../../components/ImagePreview';

import * as R from 'ramda';

const Container = styled.div`
  margin: ${({ theme }) => theme.pageMargin};
  & input,
  textarea {
    box-sizing: border-box;
  }
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    margin: ${({ theme }) => theme.mobilePageMargin};
  }
`;

const FormGroup = styled.div`
  & > * {
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

  & > * {
    margin-right: 15px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

const DateUpdated = styled.span`
  display: inherit;
  & > * {
    margin-right: 5px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

const Text = styled.p`
  font: ${({ theme }) => theme.fonts.medium18};
`;
const TextBold = styled.p`
  font: ${({ theme }) => theme.fonts.bold18};
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
`;

// TODO: Abstract component as utility for forms:
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RequiredText = styled.p`
  color: ${({ theme }) => theme.colours.reds.red1};
  font: ${({ theme }) => theme.fonts.medium14};
`;

const EditSponsors = () => {
  const {
    params: { id },
  } = useRouteMatch();

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
    lastUpdated,

    updateName,
    updateWebsite,
    updateTierId,
    updateTermSeason,
    updateTermYear,
    updateDescription,
    updateLogo,
    updateVideoLink,

    saveForm,
    closeForm,
    deleteForm,
  } = useSponsorForm(parseInt(id));

  /* Validation states */
  const [nameError, setNameError] = useState(R.isEmpty(name));
  const [websiteError, setWebsiteError] = useState(R.isEmpty(website));
  const [tierIdError, setTierIdError] = useState(R.isEmpty(tierId));
  const [descriptionError, setDescriptionError] = useState(R.isEmpty(description));
  const [termSeasonError, setTermSeasonError] = useState(R.isEmpty(termSeason));
  const [termYearError, setTermYearError] = useState(R.isEmpty(termYear));
  const [logoError, setLogoError] = useState(R.isEmpty(logoStr));

  const reqNotFilled = nameError || websiteError || tierIdError || 
    descriptionError || termSeasonError || termYearError || logoError;

  return (
    !loading && (
      <Container id="sponsor-root">
        <TopInfo>
          <Button cancel onClick={closeForm}>
            {buttonCopies.BACK}
          </Button>
          {lastUpdated && (
            <DateUpdated>
              <TextBold>{commonCopies.LAST_UPDATED_DATE}</TextBold>
              <Text>{lastUpdated}</Text>
            </DateUpdated>
          )}
        </TopInfo>
        <FormGroup>
          <FormContainer title={sponsorsCopies.NAME_LABEL} isError={nameError} >
            <TextInput
              placeholder={sponsorsCopies.NAME_PLACEHOLDER}
              value={name}
              isError={nameError}
              onChange={(value) => {
                setNameError(R.isEmpty(value));
                updateName(value);
              }}
            />
          </FormContainer>
          <FormContainer title={sponsorsCopies.WEBSITE_LABEL} isError={websiteError}>
            <TextInput
              placeholder={sponsorsCopies.WEBSITE_PLACEHOLDER}
              isError={websiteError}
              value={website}
              onChange={(value) => {
                setWebsiteError(R.isEmpty(value));
                updateWebsite(value);
              }}
            />
          </FormContainer>
          <FormContainer title={sponsorsCopies.TIER_LABEL} isError={tierIdError}>
            <Selector
              value={tierId}
              isError={tierIdError}
              items={sponsorTiers}
              onSelect={(value) => {
                setTierIdError(R.isEmpty(value));
                updateTierId(value);
              }}
              placeholder={sponsorsCopies.TIER_PLACEHOLDER}
            />
          </FormContainer>
          <FormContainer 
            title={sponsorsCopies.START_DATE_LABEL}
            isError={termSeasonError || termYearError}
            >
            <InlineSpaced>
              <NarrowSelector
                value={termSeason}
                items={terms}
                onSelect={(value) => {
                  setTermSeasonError(R.isEmpty(value));
                  updateTermSeason(value);
                }}
                placeholder={sponsorsCopies.START_DATE_TERM_PLACEHOLDER}
                isError={termSeasonError}
              />
              <NarrowSelector
                value={termYear}
                items={years}
                onSelect={(value) => {
                  setTermYearError(R.isEmpty(value))
                  updateTermYear(value)
                }}
                placeholder={sponsorsCopies.START_DATE_YEAR_PLACEHOLDER}
                isError={termYearError}
              />
            </InlineSpaced>
          </FormContainer>
          <FormContainer 
            title={sponsorsCopies.CONTRIBUTIONS_LABEL}
            isError={descriptionError}
            >
            <TextMultilineInput
              multiLine
              placeholder={sponsorsCopies.CONTRIBUTIONS_PLACEHOLDER}
              value={description}
              onChange={(updatedValue) => {
                setDescriptionError(R.isEmpty(updatedValue));
                updateDescription(updatedValue); 
              }}
              isError={descriptionError}
            />
          </FormContainer>
          <FormContainer 
            title={sponsorsCopies.LOGO_LABEL}
            requiredText={commonCopies.REQUIRED_IMAGE}
            isError={logoError}
            >
            <ImagePreview
              // Use local image file if user uploaded new image,
              // else use existing image URL.
              src={logoFile ? window.URL.createObjectURL(logoFile) : logoStr}
              onNew={(file) => {
                setLogoError(false);
                updateLogo(file.name, file);
              }}
              onDelete={() => {
                setLogoError(true);
                updateLogo('', null);
              }}
              isError={logoError}
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
            <Button disabled={reqNotFilled} onClick={saveForm}>{buttonCopies.SAVE}</Button>
            <Button cancel onClick={closeForm}>
              {buttonCopies.CANCEL}
            </Button>
          </div>
          <Button del onClick={deleteForm}>
            {buttonCopies.DELETE}
          </Button>
        </ButtonContainer>
        {reqNotFilled && <RequiredText>{buttonCopies.REQUIREMENTS_NOT_MET}</RequiredText>}
      </Container>
    )
  );
};

export default EditSponsors;

// TODO: Make PR once sponsors field is ready. Ignore postings.
