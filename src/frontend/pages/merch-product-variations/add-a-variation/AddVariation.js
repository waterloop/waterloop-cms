import React, { useMemo } from 'react';
import ImagePreview from '../../../components/ImagePreview/index';
import FormContainer from '../../../components/FormContainer/index';
import Button from '../../../components/Button/index';
import UnstyledSelector from '../../../components/Selector/index'
import TextInput from '../../../components/TextInput/index';
import useProductVariationsForm from '../../../hooks/product-variations-form';
import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

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

const Selector = styled(UnstyledSelector)`
  max-width: 250px;
  width: 100%;
  color: black;
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


const AddProductVariation = ({ add }) => {
  const {
    variationName,
    setVariationName,
    price,
    setPrice,
    picture,
    setPicture,
    pictureUrl,
    setPictureURL,
    imageUpload,
    imageDelete,
    imageURLDelete,
    stock,
    setStock,
    closeForm,
    saveForm,
    showModal,
    closeModal,
    getProductNames,
    productId,
    setProductId
  } = useProductVariationsForm();


  const productNames = getProductNames()

  const displayImages = useMemo(() => {
    if (pictureUrl){
    return [
      <ImageCard>
      <ImagePreview
        src={pictureUrl}
        onDelete={() => {
          setPicture(null);
        }}
      />
    </ImageCard>
    ]};
  
  }, [picture, pictureUrl, imageURLDelete, imageDelete, setPicture, setPictureURL]);

  return (
    <EditVariationsPage>
      <TopRow>
        <Button cancel onClick={closeForm}>
          &#60; Back
        </Button>
      </TopRow>
      <EditVariationBody>

    <FormContainer title="Product Name (required)">
        <Selector
              className=''
              value={productId}
              placeholder='Select product'
              items={productNames}
              onSelect={setProductId}
            />
    </FormContainer> 

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
        <VariationImages>
          <FormContainer title="Image (required)">
            <VariationInfo>
              <ImageCards>
                {displayImages}
                <ImagePreview onNew={imageUpload} />
              </ImageCards>
            </VariationInfo>
          </FormContainer>
        </VariationImages>

        <VariationButtons>
          <Button label="Save" onClick={saveForm} />
          <Button label="Cancel" cancel onClick={closeForm} />
          {!add && (
              <Dialog open={showModal} onClose={closeModal}>
                <DialogActions>
                  <Button label="Cancel" cancel onClick={closeModal} />
                </DialogActions>
              </Dialog>
          )}
        </VariationButtons>
      </EditVariationBody>
    </EditVariationsPage>
  );
};

export default AddProductVariation;
