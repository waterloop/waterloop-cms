import React, { useMemo } from 'react';
import ImagePreview from 'frontend/components/ImagePreview/index';
import FormContainer from 'frontend/components/FormContainer/index';
import Button from 'frontend/components/Button/index';
import TextInput from 'frontend/components/TextInput/index';
import useBlogForm from 'frontend/hooks/blog-form';
import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import UnstyledSelector from 'frontend/components/Selector';

const EditBlogPage = styled.div`
  padding: 64px 88px 65px 58px;
`;

const TopRow = styled.div`
  display: flex;
`;

const Selector = styled(UnstyledSelector)`
  max-width: 250px;
  width: 100%;
`;

const EditBlogBody = styled.div`
  padding-left: 30px;
`;

const ImagesText = styled.div`
  font: ${({ theme }) => theme.fonts.light18};
  color: ${({ theme }) => theme.colours.blues.blue1};
  margin: 0;
`;

const ImageCard = styled.div`
  margin-right: 18px;
`;

const ImageCards = styled.div`
  padding-top: 20px;
  display: flex;
`;

const BlogButtons = styled.div`
  padding-left: 10px;
`;

const BlogInfo = styled.div`
  padding-left: 10px;
`;

const DeleteButton = styled.div`
  float: right;
`;

const BlogImages = styled.div`
  margin-bottom: 60px;
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
  font: ${({ theme }) => theme.fonts.light18};
  color: #2a2a2a;
`;

const ErrorMessage = styled.p`
  font: ${({ theme }) => theme.fonts.medium18};
  color: ${({ theme }) => theme.colours.blacks.black1};
`;

const ErrorTitle = styled.p`
  font: ${({ theme }) => theme.fonts.medium24};
  color: ${({ theme }) => theme.colours.reds.red1};
  margin-bottom: 30px;
`;

const RedDeleteButton = styled(Button)`
  background-color: #d02027;
  color: white;
`;

const EditBlog = ({ add }) => {
  const {
    blogTitle,
    setBlogTitle,
    author,
    setAuthor,
    summary,
    setSummary,
    date,
    setDate,
    content,
    setContent,
    currentImageURL,
    uploadedImageURL,
    closed,
    setClosed,
    visibility,
    setVisibility,
    category,
    setCategory,
    errors,
    imageUpload,
    imageDelete,
    closeForm,
    saveForm,
    deleteForm,
    showModal,
    openModal,
    closeModal,
  } = useBlogForm();

  const displayImages = useMemo(() => {
    return (
      <div>
        {currentImageURL !== '' && (
          <ImageCard>
            <ImagePreview
              src={currentImageURL}
              onDelete={() => {
                imageDelete();
              }}
            />
          </ImageCard>
        )}
        {uploadedImageURL !== '' && (
          <ImageCard>
            <ImagePreview
              src={URL.createObjectURL(uploadedImageURL)}
              onDelete={() => {
                imageDelete();
              }}
            />
          </ImageCard>
        )}
      </div>
    );
  }, [currentImageURL, uploadedImageURL]);

  const errorList = useMemo(() => {
    return [
      ...errors.map((error, index) => {
        return (
          <ErrorMessage key={`${error}-${index}`}>
            {`${index + 1}. `}
            {error}
          </ErrorMessage>
        );
      }),
    ];
  }, [errors]);

  const updateVisibilityCatagory = (value) => {
    switch (value) {
      case 2:
        setVisibility('Public');
        break;
      default:
        setVisibility('Hidden');
        break;
    }
  };

  const updateClosedCatagory = (value) => {
    switch (value) {
      case 1:
        setClosed(true);
        break;
      default:
        setClosed(false);
        break;
    }
  };

  return (
    <EditBlogPage>
      <TopRow>
        <Button cancel onClick={closeForm}>
          &#60; Back
        </Button>
      </TopRow>

      <EditBlogBody>
        <FormContainer title="Blog Title (required)">
          <TextInput
            value={blogTitle}
            onChange={setBlogTitle}
            placeholder="Blog Title"
          />
        </FormContainer>

        <FormContainer title="Author (required)">
          <TextInput value={author} onChange={setAuthor} placeholder="Author" />
        </FormContainer>

        <FormContainer title="Summary (required)">
          <BlogInfo>
            <TextInput
              value={summary}
              onChange={setSummary}
              placeholder="A brief summary of the blog post ..."
              multiLine={true}
            />
          </BlogInfo>
        </FormContainer>

        <FormContainer title="Date Published (required): Must be day-month-year">
          <TextInput
            value={date}
            onChange={setDate}
            placeholder="23-May-2021"
          />
        </FormContainer>

        <FormContainer title="Content (required)">
          <BlogInfo>
            <TextInput
              value={content}
              onChange={setContent}
              placeholder=""
              multiLine={true}
            />
          </BlogInfo>
        </FormContainer>

        <FormContainer title="Closed (required: open by default)">
          <Selector
            value={closed ? 1 : 2}
            items={[
              { id: 1, text: 'True' },
              { id: 2, text: 'False' },
            ]}
            onSelect={updateClosedCatagory}
          />
        </FormContainer>

        <FormContainer title="Visibility (required: public by default)">
          <Selector
            value={visibility === 'Hidden' ? 1 : 2}
            items={[
              { id: 1, text: 'Hidden' },
              { id: 2, text: 'Public' },
            ]}
            onSelect={updateVisibilityCatagory}
          />
        </FormContainer>

        <FormContainer title="Category (required)">
          <TextInput
            value={category}
            onChange={setCategory}
            placeholder="Blog or Media Appearance etc.."
          />
        </FormContainer>

        <BlogImages>
          <FormContainer title="Image (required)">
            <BlogInfo>
              <ImagesText>Upload only one image</ImagesText>
              <ImageCards>
                {displayImages}
                <ImagePreview onNew={imageUpload} />
              </ImageCards>
            </BlogInfo>
          </FormContainer>
        </BlogImages>

        {errors.length > 0 && (
          <>
            <ErrorTitle> Errors: </ErrorTitle>
            {errorList}
          </>
        )}

        <BlogButtons>
          <Button label="Save" onClick={saveForm} />
          <Button label="Cancel" cancel onClick={closeForm} />
          {!add && (
            <DeleteButton>
              <Button label="Delete" del onClick={openModal} />
              <Dialog open={showModal} onClose={closeModal}>
                <DialogTitle>
                  <ModalTitle>
                    Delete this Blog
                    <IconButton>
                      <CloseIcon onClick={closeModal} />
                    </IconButton>
                  </ModalTitle>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    <ModalDescription>
                      Are you sure you want to delete this Blog? This process
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
        </BlogButtons>
      </EditBlogBody>
    </EditBlogPage>
  );
};

export default EditBlog;
