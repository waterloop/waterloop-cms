import React, { useMemo } from 'react';
import ImagePreview from '../../../components/ImagePreview/index';
import FormContainer from '../../../components/FormContainer/index';
import Button from '../../../components/Button/index';
import TextInput from '../../../components/TextInput/index';
import useGooseForm from '../../../hooks/goose-form';
import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const EditGoosePage = styled.div`
  padding: 64px 88px 65px 58px;
`;

const TopRow = styled.div`
  display: flex;
`;

const LastUpdated = styled.div`
  font-family: IBM Plex Sans;
  font-size: 18px;
  font-weight: 500;
  text-align: right;
  flex: auto;
`;

const EditGooseBody = styled.div`
  padding-left: 30px;
`;

const GooseInfo = styled.div`
  padding-left: 10px;
`;

const GooseImages = styled.div`
  margin-bottom: 60px;
`;

const ImagesText = styled.div`
  font-family: IBM Plex Sans;
  font-size: 18px;
  color: #232535;
  margin: 0;
`;

const ImageCard = styled.div`
  margin-right: 18px;
`;

const ImageCards = styled.div`
  padding-top: 20px;
  display: flex;
`;

const GooseButtons = styled.div`
  padding-left: 10px;
`;

const DeleteButton = styled.div`
  float: right;
`;

const ModalTitle = styled.div`
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  color: #2a2a2a;
  display: flex;
  justify-content: space-between;
`;

const ModalDescription = styled.div`
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  color: #2a2a2a;
`;

const RedDeleteButton = styled(Button)`
  background-color: #d02027;
  color: white;
`;

const EditGoose = ({ add }) => {
  const {
    gooseName,
    setGooseName,
    description,
    setDescription,
    images,
    imageUrls,
    getLastUpdated,
    imageUpload,
    imageDelete,
    imageUrlDelete,
    closeForm,
    saveForm,
    deleteForm,
    showModal,
    openModal,
    closeModal,
  } = useGooseForm();

  const displayImages = useMemo(() => {
    return [
      ...imageUrls.map((image, index) => {
        return (
          <ImageCard key={`${image.id}-${index}`}>
            <ImagePreview
              src={image.imgDir}
              onDelete={() => {
                imageUrlDelete(index);
              }}
            />
          </ImageCard>
        );
      }),
      ...images.map((image, index) => {
        return (
          <ImageCard key={`${image.filename}-${index}`}>
            <ImagePreview
              src={URL.createObjectURL(image)}
              onDelete={() => {
                imageDelete(index);
              }}
            />
          </ImageCard>
        );
      }),
    ];
  }, [images, imageUrls, imageUrlDelete, imageDelete]);

  return (
    <EditGoosePage>
      <TopRow>
        <Button cancel onClick={closeForm}>
          &#60; Back
        </Button>
        <LastUpdated>{`Last updated: ${getLastUpdated()}`}</LastUpdated>
      </TopRow>

      <EditGooseBody>
        <FormContainer title="Name (required)">
          <TextInput
            value={gooseName}
            onChange={setGooseName}
            placeholder="Goose V"
            className="goose-info"
          />
        </FormContainer>

        <FormContainer title="Description (required)">
          <GooseInfo>
            <TextInput
              value={description}
              onChange={setDescription}
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
              multiLine={true}
            />
          </GooseInfo>
        </FormContainer>

        <GooseImages>
          <FormContainer title="Images (at least one is required)">
            <GooseInfo>
              <ImagesText>
                If this Goose is not selected as the "current Goose", only the
                leftmost image will be displayed.
              </ImagesText>
              <ImagesText>
                The images can be rearranged by dragging them into the desired
                order.
              </ImagesText>
              <ImageCards>
                {displayImages}
                <ImagePreview onNew={imageUpload} />
              </ImageCards>
            </GooseInfo>
          </FormContainer>
        </GooseImages>

        <GooseButtons>
          <Button label="Save" onClick={saveForm} />
          <Button label="Cancel" cancel onClick={closeForm} />
          {!add && (
            <DeleteButton>
              <Button label="Delete" del onClick={openModal} />
              <Dialog open={showModal} onClose={closeModal}>
                <DialogTitle>
                  <ModalTitle>
                    Delete this Goose
                    <IconButton>
                      <CloseIcon onClick={closeModal} />
                    </IconButton>
                  </ModalTitle>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    <ModalDescription>
                      Are you sure you want to delete this Goose? This process
                      cannot be undone.
                    </ModalDescription>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button label="Cancel" cancel onClick={closeModal} />
                  <RedDeleteButton label="Delete" onClick={deleteForm} />
                </DialogActions>
              </Dialog>
            </DeleteButton>
          )}
        </GooseButtons>
      </EditGooseBody>
    </EditGoosePage>
  );
};

export default EditGoose;
