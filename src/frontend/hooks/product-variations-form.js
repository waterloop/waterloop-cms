import { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useProductVariations from '../hooks/product-variations'
import useProducts from '../hooks/products'
import api from '../api';
import moment from 'moment';

const useProductVariationsForm = () => {
  const [productName, setProductName] = useState('')
  const [productId, setProductId] = useState(null)
  const [variationName, setVariationName] = useState('');
  const [price, setPrice] = useState(null);
  const [stock, setStock] = useState(null);
  const [picture, setPicture] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const params = useParams();
  const { products } = useProducts();
  const { productVariations } = useProductVariations();

  useEffect(() => {
    if (productVariations.length > 0 && products.length > 0) {
      (async () => {
        try {
          if (params.variationId) {
            const productVariationId = parseInt(params.variationId, 10);
            const variation = productVariations.find((variation) => variation.id === productVariationId);
            
            if (variation) {
              const product = await products.find(product => product.id === variation.productId);
              setProductName(product.name);
              setProductId(product.id);
              setVariationName(variation.variationName);
              setPrice(variation.price);
              setStock(variation.stock);
              setPicture(variation.picture);
            }
          }
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [productVariations, products, params.variationId]);
  
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeForm = useCallback(() => {
    history.push('/variations');
  }, [history]);

  const saveForm = useCallback(async () => {

    try {
        const data = new FormData();
        const res = await api.formUpload(data);
      
      const currentDateTime = new Date();
      const unixTimestamp = currentDateTime.getTime();

      const productVariationInfo = {
        variationName,
        productId,
        price,
        stock, 
        picture,
        lastUpdated: unixTimestamp
      }
      
      if (variationName && price && stock) {
        if (params.variationId) {
          await api.products.updateProductVariation(params.variationId, productId, productVariationInfo);
        } 

        else {
          console.log(productVariationInfo)
          const res = await api.products.addProductVariation(productVariationInfo);
          console.log(res.data)
        }
       
      } 
      else {
        throw new Error('Please fill all the required fields.');
      }
      // onSuccess:
      closeForm();
    } catch (e) {
      // TODO: Display "could not add/update" error to user as dialogue.
      // eslint-disable-next-line no-console
      
      console.error(e);
    }
  }, [params, variationName, price, stock, closeForm]);

  const deleteForm = useCallback(async () => {
    try {
      if (params.variationId) {
        const productVariationId = parseInt(params.variationId, 10);
        const variation = productVariations.find((variation) => variation.id === productVariationId);
  
        if (variation) {
          const product = products.find(product => product.id === variation.productId);
  
          if (product) {
            const productId = product.id;
            await api.products.deleteProductVariation(productId, params.variationId);
          } 
        }
      }
      closeForm();
    } catch (error) {
      console.error('Error deleting product variation:', error);
      closeForm();
    }
  }, [params, productVariations, products, closeForm]);

  const getLastUpdated = useCallback(() => {
    const variation = productVariations.find((variation) => variation.id === parseInt(params.variationId, 10));
    if (variation) {
      return moment.utc(variation.updatedAt).local().format('MMMM D, YYYY');
    }
    return '';
  }, [productVariations, params.variationId]);

  const getProductNames = useCallback(() => {
    const uniqueProductNames = [...new Set(products.map((product) => ({ text: product.name, id: product.id })))];    
  
    return uniqueProductNames;
  }, [productVariations]);
  
  const setVariationIdGivenName = useCallback((productName) => {
    const varId = productVariations.find((variation) => variation.productName == productName).productId

    setProductId(varId)

  })

  return {
    productName, 
    setProductName,
    productId, 
    setProductId,
    variationName,
    setVariationName,
    price,
    setPrice,
    stock,
    setStock,
    getProductNames,
    setVariationIdGivenName,
    closeForm,
    saveForm,
    deleteForm,
    getLastUpdated,
    showModal,
    openModal,
    closeModal,
  };
};

export default useProductVariationsForm;
