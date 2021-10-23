import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { descriptionCopies, buttonCopies, commonCopies } from '../Copies';
import useSponsorDescForm from '../hooks/sponsor-desc';

import UnstyledFormContainer from '../../../components/FormContainer';
import UnstyledTextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import UnstyledImagePreview from '../../../components/ImagePreview';

import Dialog from '../../../components/Dialog';

import * as R from 'ramda';

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

    &:only-child {
      margin-bottom: 0;
    }
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

const RequiredText = styled.p`
  color: ${({ theme }) => theme.colours.reds.red1};
  font: ${({ theme }) => theme.fonts.medium14};
`;

const useRequirements = (reqs) => {
  let res = {
    titleError: R.isEmpty(reqs.title),
    descriptionError: R.isEmpty(reqs.description),
    imagesError: R.isEmpty(reqs.images)
  }

  return {
    ...res,
    reqNotFilled: !R.all(R.equals(false))(Object.values(res))
  }
}

const EditPageDescription = () => {
  const {
    title,
    description,
    images,
    imageFiles,
    lastUpdated,
    errMsg,

    updateTitle,
    updateDescription,
    updateImage,
    deleteImage,
    updateFailure,

    saveForm,
    closeForm
  } = useSponsorDescForm();

  const {
    titleError,
    descriptionError,
    imagesError,
    reqNotFilled
  } = useRequirements({
    title,
    description,
    images
  })

  /* Validation states */
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setDialogOpen(!!errMsg);
  }, [errMsg])

  return (
    <>
    <Dialog
      title={commonCopies.DIALOG_ERROR_TITLE}
      actionChildren={
        <Button onClick={() => {
          setDialogOpen(false);
          updateFailure("");
        }}>{buttonCopies.OK}</Button>
      }
      open={dialogOpen}
    >
      <Text>{errMsg}</Text>  
    </Dialog>
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
        <FormContainer title={descriptionCopies.TITLE_LABEL} isError={titleError}>
          <TextInput 
            placeholder={descriptionCopies.TITLE_PLACEHOLDER} 
            value={title}
            isError={titleError}
            onChange={updateTitle}
          />
        </FormContainer>

        <FormContainer title={descriptionCopies.DESCRIPTION_LABEL} isError={descriptionError}>
          <TextMultilineInput 
            multiLine 
            placeholder={descriptionCopies.DESCRIPTION_PLACEHOLDER}
            value={description}
            isError={descriptionError}
            onChange={updateDescription}  
          />
        </FormContainer>
        <FormContainer 
          title={descriptionCopies.IMAGES_LABEL} 
          isError={imagesError}
          requiredText={commonCopies.REQUIRED_IMAGE}
        >
          <ImagesContainer>
            {images.map((image, idx) =>
              <ImagePreview
                key={idx}
                src={imageFiles[idx] ? window.URL.createObjectURL(imageFiles[idx]) : image}
                onNew={() => {}}
                onDelete={() => {
                  deleteImage(idx);
                }}
              />  
            )}
            {/* Empty ImagePreview component to allow user to add new image. */}
            <ImagePreview
              isError={imagesError}
              src={""}
              onNew={(file) => {
                updateImage(file.name, file);
              }}
              onDelete={() => {}}
            />
          </ImagesContainer>
        </FormContainer>
      </FormGroup>
      <ButtonContainer>
        <div>
          <Button disabled={reqNotFilled} onClick={saveForm}>{buttonCopies.SAVE}</Button>
          <Button cancel onClick={closeForm}>{buttonCopies.CANCEL}</Button>
        </div>
      </ButtonContainer>
      {reqNotFilled && <RequiredText>{buttonCopies.REQUIREMENTS_NOT_MET}</RequiredText>}
    </Container>
    </>
  );
}

export default EditPageDescription;