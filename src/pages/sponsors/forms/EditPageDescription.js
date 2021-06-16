import React from 'react';
import styled from 'styled-components';
import { descriptionCopies, buttonCopies, commonCopies } from '../Copies';
import useSponsorDescForm from '../hooks/sponsor-desc';
import useRichText from '../../../hooks/rich-text';
import { convertToHTML } from 'draft-convert';


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

const ImagesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  &>* {
    margin-right: 20px;
    margin-bottom: 20px;
  }
`;

const TopInfo = styled.span`
  display: flex;
  flex-direction: row;

  justify-content: space-between;

  & button {
    padding: 0;
  }
`;

const DateUpdated = styled.span`
  display: inherit;
  &>* {
    margin-right: 5px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

const Text = styled.p`
  font: ${({theme}) => theme.fonts.medium18}
`;
const TextBold = styled.p`
  font: ${({theme}) => theme.fonts.bold18}
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
`

// TODO: Abstract component as utility for forms:
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;


const EditPageDescription = () => {
  const {
    title,
    description,
    images,
    imageFiles,
    lastUpdated,

    updateTitle,
    updateDescription,
    updateImage,
    deleteImage,

    saveForm,
    closeForm
  } = useSponsorDescForm();

  const onSubmit = () => { //how do I have a hook in a callback?
    const newDesc = convertToHTML(description.getCurrentContent());
    updateDescription(newDesc);
    saveForm();
  }

  return (
    <Container id="sponsor-root">
      <TopInfo>
        <Button cancel onClick={closeForm}>
          {buttonCopies.BACK}
        </Button>
        {lastUpdated && <DateUpdated>
          <TextBold>{commonCopies.LAST_UPDATED_DATE}</TextBold>
          <Text>{lastUpdated}</Text>
        </DateUpdated>}
        
      </TopInfo>
      <FormGroup>
        <FormContainer title={descriptionCopies.TITLE_LABEL}>
          <TextInput 
            placeholder={descriptionCopies.TITLE_PLACEHOLDER} 
            value={title}
            onChange={updateTitle}
          />
        </FormContainer>

        <FormContainer title={descriptionCopies.DESCRIPTION_LABEL}>
          <TextMultilineInput 
            multiLine 
            placeholder={descriptionCopies.DESCRIPTION_PLACEHOLDER}
            value={description}
            onChange={updateDescription}   
          />
        </FormContainer>
        <FormContainer title={descriptionCopies.IMAGES_LABEL}>
          <ImagesContainer>
            {images.map((image, idx) =>
              <ImagePreview
                key={image}
                src={imageFiles[idx] ? window.URL.createObjectURL(imageFiles[idx]) : image}
                onNew={() => {}}
                onDelete={() => deleteImage(idx)}
              />  
            )}
            {/* Empty ImagePreview component to allow user to add new image. */}
            <ImagePreview
              src={""}
              onNew={(file) => updateImage(file.name, file)}
              onDelete={() => {}}
            />
          </ImagesContainer>
        </FormContainer>
      </FormGroup>
      <ButtonContainer>
        <div>
          <Button onClick={onSubmit}>{buttonCopies.SAVE}</Button>
          <Button cancel onClick={closeForm}>{buttonCopies.CANCEL}</Button>
        </div>
      </ButtonContainer>
    </Container>
  );
}

export default EditPageDescription;