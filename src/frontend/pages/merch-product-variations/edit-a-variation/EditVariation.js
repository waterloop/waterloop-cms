import React, { useMemo } from 'react';
import ImagePreview from '../../../components/ImagePreview/index';
import FormContainer from '../../../components/FormContainer/index';
import Button from '../../../components/Button/index';
import TextInput from '../../../components/TextInput/index';
import useProductVariationsForm from '../../../hooks/product-variations-form';
import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const EditVariationsPage = styled.div`
  padding: 64px 88px 65px 58px;
`;

const EditVariationBody = styled.div`
  padding-left: 30px;
`;


const TopRow = styled.div`
  display: flex;
`;
const VariationImages = styled.div`
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


const VariationInfo = styled.div`
  padding-left: 10px;
`;


const VariationButtons = styled.div`
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

const ProductName = styled.h2`
font-family: IBM Plex Sans;
padding-left: 30px;
font-size: 30px;
`

const RedDeleteButton = styled(Button)`
  background-color: #d02027;
  color: white;
`;

const EditProductVariation = ({ add }) => {
  const {
    productName,
    setProductName,
    variationName,
    setVariationName,
    price,
    setPrice,
    stock,
    setStock,
    closeForm,
    saveForm,
    deleteForm,
    getLastUpdated,
    showModal,
    openModal,
    closeModal,
  } = useProductVariationsForm();


  return (
    <EditVariationsPage>
      <TopRow>
        <Button cancel onClick={closeForm}>
          &#60; Back
        </Button>
      </TopRow>
      <ProductName>
      Product: {productName}
      </ProductName>
      <EditVariationBody>

      <FormContainer title="Variation Name (required)">
          <TextInput
            value={variationName}
            onChange={setVariationName}
            placeholder="Black"
            className="variation-info"
          />
        </FormContainer>


        <FormContainer title="Price (required)">
          <TextInput
            value={price}
            onChange={setPrice}
            placeholder="100"
            className="variation-info"
          />
        </FormContainer>

        <FormContainer title="Stock (required)">
          <TextInput
            value={stock}
            onChange={setStock}
            placeholder="10"
            className="variation-info"
          />
        </FormContainer>
{/* 
        <VariationImages>
          <FormContainer title="Images (at least one is required)">
            <VariationInfo>
              <ImagesText>
                The images can be rearranged by dragging them into the desired
                order.
              </ImagesText>
              <ImageCards>
                {displayImages}
                <ImagePreview onNew={imageUpload} />
              </ImageCards>
            </VariationInfo>
          </FormContainer>
        </VariationImages> */}

        <VariationButtons>
          <Button label="Save" onClick={saveForm} />
          <Button label="Cancel" cancel onClick={closeForm} />
          {!add && (
            <DeleteButton>
              <Button label="Delete" del onClick={openModal} />
              <Dialog open={showModal} onClose={closeModal}>
                <DialogTitle>
                  <ModalTitle>
                    Delete this Variation
                    <IconButton>
                      <CloseIcon onClick={closeModal} />
                    </IconButton>
                  </ModalTitle>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    <ModalDescription>
                      Are you sure you want to delete this variation? This process
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
        </VariationButtons>
      </EditVariationBody>
    </EditVariationsPage>
  );
};

export default EditProductVariation;
