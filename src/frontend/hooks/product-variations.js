import { useEffect } from 'react';
import api from '../api';
import { useDispatch, useSelector } from 'react-redux';
import * as productVariationActions from '../state/product-variations/actions';
import * as productVariationSelectors from '../state/product-variations/selectors';

const useProductVariations = () => {
  const dispatch = useDispatch();
  const productVariations = useSelector(productVariationSelectors.allVariations);
  useEffect(() => {
    (async () => {
      try {
        const productsResponse = await api.products.getProducts();
        const products = productsResponse.data;

        const uniqueProductIds = [...new Set(products.map(product => product.id))];
        
        let newProductVariations = [];

        for (const productId of uniqueProductIds) {
          const productVariationsResponse = await api.products.getProductVariations(productId);
          const productName = products.find((product) => product.id === productId)?.name;

          for (const productVariation of productVariationsResponse.data){
            const variation = {...productVariation, productName};
            newProductVariations = [...newProductVariations, variation];
            console.log(newProductVariations)

          }
          
        }
        dispatch(productVariationActions.updateProductVariationsInfo(newProductVariations));
      } catch (err) {
        console.error(err);
      }
    })();
  }, [dispatch]); 

  return {
    productVariations,
  };
};

export default useProductVariations;
