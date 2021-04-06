import React from 'react';
// import useSponsorForm from '../hooks/sponsor-form';
import styled from 'styled-components';
import { descriptionCopies, buttonCopies } from './Copies';

import UnstyledFormContainer from '../../../components/FormContainer';
import UnstyledTextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import UnstyledImagePreview from '../../../components/ImagePreview';

const Container = styled.div`
  margin: ${({ theme }) => theme.pageMargin};
  & input, textarea {
    box-sizing: border-box;
  }
  @media only screen and (max-width: ${({theme}) => theme.breakpoints.md}px) {
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

const TextInput = styled(UnstyledTextInput)`
  max-width: 500px;
  width: 100%;
`;

const TextMultilineInput = styled(UnstyledTextInput)`
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


const EditPageDescription = () => {
  return (
    <Container id="sponsor-root">
      <TopInfo>
        <Button cancel onClick={/*{closeForm*/ ()=>{}}>
          {buttonCopies.BACK}
        </Button>
        {/* TODO: Display last time sponsor info was updated. */}
        <p id="UPDATED-DATE-HERE"></p>
      </TopInfo>
      <FormGroup>
        <FormContainer title={descriptionCopies.TITLE_LABEL}>
          <TextInput 
            placeholder={descriptionCopies.TITLE_PLACEHOLDER} 
            value={""}
            onChange={() => {}}
          />
        </FormContainer>

        <FormContainer title={descriptionCopies.DESCRIPTION_LABEL}>
          <TextMultilineInput 
            multiLine 
            placeholder={descriptionCopies.DESCRIPTION_PLACEHOLDER}
            value={""}
            onChange={() => {}}   
          />
        </FormContainer>
        <FormContainer title={descriptionCopies.IMAGES_LABEL}>
          <ImagePreview
            // Use local image file if user uploaded new image,
            // else use existing image URL.
            src={/*logoFile ? window.URL.createObjectURL(logoFile) : logoStr*/ ""}
            onNew={/*(file) => {
              updateLogo(file.name, file);
            }*/ () => {}}
            onDelete={/*() => {
              updateLogo('', null);
            }*/ () => {}}
          />
        </FormContainer>
      </FormGroup>
      <ButtonContainer>
        <div>
          <Button onClick={/*saveForm*/ () => {}}>{buttonCopies.SAVE}</Button>
          <Button cancel onClick={/*{closeForm*/ () => {}}>{buttonCopies.CANCEL}</Button>
        </div>
        <Button del onClick={/*deleteForm*/ () => {}}>{buttonCopies.DELETE}</Button>
      </ButtonContainer>
    </Container>
  );
}

export default EditPageDescription;