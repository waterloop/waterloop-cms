import React from 'react';
import useProductsForm from '../../../hooks/products-form';
import FormContainer from '../../../components/FormContainer/index';
import Button from '../../../components/Button/index';
import TextInput from '../../../components/TextInput/index';
import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const EditProductPage = styled.div`
  padding: 64px 88px 65px 58px;
`;

const TopRow = styled.div`
  display: flex;
`;

const EditProductBody = styled.div`
  padding-left: 30px;
`;

const ProductInfo = styled.div`
  padding-left: 10px;
`;


const ProductButtons = styled.div`
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

const EditProduct = ({ add }) => {
  const {
    productName,
    setProductName,
    description,
    setDescription,
    category,
    setCategory,
    closeForm,
    saveForm,
    deleteForm,
    openVariations,
    showModal,
    openModal,
    closeModal,
  } = useProductsForm();


  return (
    <EditProductPage>
      <TopRow>
        <Button cancel onClick={closeForm}>
          &#60; Back
        </Button>
        <Button onClick={openVariations}>
          See all variations
        </Button>
      </TopRow>

      <EditProductBody>
        <FormContainer title="Name (required)">
          <TextInput
            value={productName}
            onChange={setProductName}
            placeholder="Sweater"
            className="product-info"
          />
        </FormContainer>

        <FormContainer title="Category (required)">
          <TextInput
            value={category}
            onChange={setCategory}
            placeholder="Clothing"
            className="product-info"
          />
        </FormContainer>

        <FormContainer title="Description (required)">
          <ProductInfo>
            <TextInput
              value={description}
              onChange={setDescription}
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
              multiLine={true}
            />
          </ProductInfo>
        </FormContainer>

        <ProductButtons>
          <Button label="Save" onClick={saveForm} />
          <Button label="Cancel" cancel onClick={closeForm} />
          {!add && (
            <DeleteButton>
              <Button label="Delete" del onClick={openModal} />
              <Dialog open={showModal} onClose={closeModal}>
                <DialogTitle>
                  <ModalTitle>
                    Delete this Product
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
        </ProductButtons>
      </EditProductBody>
    </EditProductPage>
  );
};

export default EditProduct;
