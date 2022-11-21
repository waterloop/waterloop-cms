import React, { useMemo } from 'react';
import ImagePreview from '../../../components/ImagePreview/index';
import FormContainer from '../../../components/FormContainer/index';
import Button from '../../../components/Button/index';
import TextInput from '../../../components/TextInput/index';
import useBlogForm from '../../../hooks/blog-form'
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import UnstyledSelector from '../../../components/Selector';

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
  color: #2A2A2A;
  display: flex;
  justify-content: space-between;
`;

const ModalDescription = styled.div`
  font: ${({ theme }) => theme.fonts.light18};
  color: #2A2A2A;
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
  background-color: #D02027;
  color: white;
`;

const EditBlog = ({ add }) => {
  const {
    blogTitle, setBlogTitle,
    author, setAuthor,
    summary, setSummary,
    date, setDate,
    link, setLink,
    currentImageURL,
    uploadedImageURL,
    closed, setClosed,
    visibility, setVisibility,
    category, setCategory,
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
     return [
       <div>
          {currentImageURL != '' && 
            <ImageCard>
              <ImagePreview
                src={currentImageURL}
                onDelete={() => {
                  imageDelete(); 
                }}
              />
          </ImageCard>
          }
          {uploadedImageURL != '' && 
            <ImageCard>
              <ImagePreview
                src={URL.createObjectURL(uploadedImageURL)}
                onDelete={() => {
                  imageDelete(); 
                }}
              />
          </ImageCard>
          }
        </div>
        ]; 
      }, [currentImageURL, uploadedImageURL]);


    const errorList = useMemo(() => {
      return [
        ...errors.map((error, index) => {
          return (
            <ErrorMessage key={error}>
              {`${index+1}. `}{error}
            </ErrorMessage>
          );
        })
      ];
    }, [errors]);

  const updateVisibilityCatagory = (value) => {
    switch (value){
      case 2:
        setVisibility("Public");
        break;
      default:
        setVisibility("Hidden");
        break;
    }
  }

  const updateClosedCatagory = (value) => {
    switch (value){
      case 1:
        setClosed(true)
        break;
      default:
        setClosed(false)
        break;
    }
  }

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
          <TextInput
            value={author}
            onChange={setAuthor}
            placeholder="Author"
          />
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

        <FormContainer title="Link (required)">
          <TextInput
            value={link}
            onChange={setLink}
            placeholder="https://..."
          />
        </FormContainer>

        <FormContainer title="Closed (required: open by default)">
          <Selector
                value={closed? 1 : 2}
                items={[{id: 1, text: "True"}, {id: 2, text: "False"}]}
                onSelect={updateClosedCatagory}
              />
        </FormContainer>

        <FormContainer title="Visibility (required: public by default)">
          <Selector
                value={visibility === "Hidden"? 1 : 2}
                items={[{id: 1, text: "Hidden"}, {id: 2, text: "Public"}]}
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
              <ImagesText>
                Upload only one image
              </ImagesText>
              <ImageCards>
                {displayImages}
                <ImagePreview onNew={imageUpload} />
              </ImageCards>
            </BlogInfo>
          </FormContainer>
        </BlogImages>

        {(errors.length > 0) && 
          <ErrorTitle>
            Errors:
            {errorList}
          </ErrorTitle>}

        <BlogButtons>
          <Button label="Save" onClick={saveForm} />
          <Button label="Cancel" cancel onClick={closeForm} />
          {!add && (<DeleteButton>
            <Button label="Delete" del onClick={openModal} />
            <Dialog
              open={showModal}
              onClose={closeModal}
            >
              <DialogTitle>
                <ModalTitle>
                  Delete this Blog
                  <IconButton>
                    <CloseIcon onClick={closeModal}/>
                  </IconButton>
                </ModalTitle>
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <ModalDescription>
                    Are you sure you want to delete this Blog? This process cannot be undone.
                  </ModalDescription>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button label="Cancel" cancel onClick={closeModal} />
                <RedDeleteButton label="Delete" onClick={deleteForm} />
              </DialogActions>
            </Dialog>
          </DeleteButton>)}
        </BlogButtons>
      </EditBlogBody>
    </EditBlogPage>
  );
};

export default EditBlog;
