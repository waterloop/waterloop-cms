import { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useProductVariations from '../hooks/product-variations';
import useProducts from '../hooks/products';
import api from '../api';
import moment from 'moment';

const useProductVariationsForm = () => {
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState(null);
  const [variationName, setVariationName] = useState('');
  const [price, setPrice] = useState(null);
  const [stock, setStock] = useState(null);
  const [picture, setPicture] = useState(null);
  const [pictureUrl, setPictureURL] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const params = useParams();
  const { products } = useProducts();
  const { productVariations } = useProductVariations();

  useEffect(() => {
    (async () => {
      try {
        let variation = {};
        let product = {};

        if (params.productId) {
          product = await products.find(
            (product) => product.id == params.productId,
          );
        }

        else if (params.variationId) {
          const productVariationId = parseInt(params.variationId, 10);
          variation = productVariations.find(
            (variation) => variation.id === productVariationId,
          );

          if (variation) {
            product = products.find(
              (product) => product.id === variation.productId,
            );
          }
        }
        
        setProductName(product.name);
        setProductId(product.id);
        setVariationName(variation.variationName);
        setPrice(variation.price);
        setStock(variation.stock);
        setPictureURL(variation.picture);
      } catch (err) {
        console.error('Error init\'ing product variation form info', err);
      }
    })();
  }, [productVariations, products, params.variationId, params.productId]);

  const imageUpload = (image) => {
    setPicture(image);
    setPictureURL(URL.createObjectURL(image));
  };

  const imageDelete = useCallback(() => {
    setPicture(null);
    setPictureURL(null);
  }, [setPicture]);

  const imageURLDelete = useCallback(() => {
    setPictureURL(null);
  }, [setPicture, setPictureURL, pictureUrl]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeForm = useCallback(() => {
    history.push(`/variations/${productId}`);
  }, [history, productId]);

  const saveForm = useCallback(async () => {
    try {
      let newPictureUrl = pictureUrl;

      if (picture instanceof File) {
        const data = new FormData();
        data.append('files', picture, picture.name);
        await api.formUpload(data);

        newPictureUrl = pictureUrl.replace('blob:', '');
      }

      const currentDateTime = new Date();
      const unixTimestamp = currentDateTime.getTime();

      const productVariationInfo = {
        variationName,
        productId,
        price,
        stock,
        picture: newPictureUrl,
        lastUpdated: unixTimestamp,
      };

      if (variationName && price && stock && picture) {
        if (params.variationId) {
          await api.products.updateProductVariation(
            params.variationId,
            productId,
            productVariationInfo,
          );
        } else {
          await api.products.addProductVariation({
            ...productVariationInfo,
            productId,
          });
        }
        setPicture(picture);
      } else {
        throw new Error('Please fill all the required fields.');
      }
      // onSuccess:
      closeForm();
    } catch (e) {
      // TODO: Display "could not add/update" error to the user as dialogue.
      console.error(e);
    }
  }, [
    params,
    variationName,
    price,
    stock,
    closeForm,
    picture,
    productId,
    pictureUrl,
  ]);

  const deleteForm = useCallback(async () => {
    try {
      if (params.variationId) {
        const productVariationId = parseInt(params.variationId, 10);
        const variation = productVariations.find(
          (variation) => variation.id === productVariationId,
        );

        if (variation) {
          const product = products.find(
            (product) => product.id === variation.productId,
          );

          if (product) {
            const productId = product.id;
            await api.products.deleteProductVariation(
              productId,
              params.variationId,
            );
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
    const variation = productVariations.find(
      (variation) => variation.id === parseInt(params.variationId, 10),
    );
    if (variation) {
      return moment.utc(variation.updatedAt).local().format('MMMM D, YYYY');
    }
    return '';
  }, [productVariations, params.variationId]);

  const getProductNames = useCallback(() => {
    const uniqueProductNames = [
      ...new Set(
        products.map((product) => ({ text: product.name, id: product.id })),
      ),
    ];

    return uniqueProductNames;
  }, [productVariations]);

  const setVariationIdGivenName = useCallback((productName) => {
    const varId = productVariations.find(
      (variation) => variation.productName == productName,
    ).productId;

    setProductId(varId);
  });
  return {
    productName,
    setProductName,
    productId,
    setProductId,
    variationName,
    setVariationName,
    price,
    setPrice,
    picture,
    setPicture,
    pictureUrl,
    setPictureURL,
    stock,
    setStock,
    getProductNames,
    setVariationIdGivenName,
    imageUpload,
    imageDelete,
    imageURLDelete,
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
