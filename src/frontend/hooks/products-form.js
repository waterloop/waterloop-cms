import { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useProducts from '../hooks/products'
import api from '../api';
import moment from 'moment';

const useProductsForm = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const params = useParams();
  const { products } = useProducts();

  useEffect(() => {
    if (products.length > 0) {
      (async () => {
        try {
          // init relevant product data when editing
          if (params.productId) {
            const productId = parseInt(params.productId, 10);
            const product = products.find((product) => product.id === productId);
            if (product) {
              setProductName(product.name);
              setDescription(product.description);
              setCategory(product.category)
            }
          }
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [setProductName, setDescription, setCategory]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeForm = useCallback(() => {
    history.push('/products');
  }, [history]);

  const saveForm = useCallback(async () => {

    try {
        const data = new FormData();
        const res = await api.formUpload(data);
      
      const productInfo = {
        name: productName,
        description,
        category
      }
      
      // ensure all fields are filled
      if (productName && description && category) {
        // update product if it exists
        if (params.productId) {
          await api.products.updateProduct(params.productId, productInfo);
        } 

        // add product if it doesnt exist
        else {
          const res = await api.products.addProduct(productInfo);
        }
       
      } 
      else {
        throw new Error('Please fill all the required fields.');
      }
      // onSuccess:
      closeForm();
    } catch (e) {

      console.error(e);
    }
  }, [params, productName, description, category, closeForm]);


  const deleteForm = useCallback(async () => {
    // delete product 
    if (params.productId) {
      await api.products.deleteProduct(params.productId);
    }
    closeForm();
  }, [params.productId, closeForm]);

  const getLastUpdated = useCallback(() => {
    const product = products.find((product) => product.id === parseInt(params.productId, 10));
    // returns last updated time of product 
    if (product) {
      return moment.utc(product.updatedAt).local().format('MMMM D, YYYY');
    }
    return '';
  }, [products, params.productId]);

  return {
    productName,
    setProductName,
    description,
    setDescription,
    category,
    setCategory,
    closeForm,
    saveForm,
    deleteForm,
    getLastUpdated,
    showModal,
    openModal,
    closeModal,
  };
};

export default useProductsForm;
