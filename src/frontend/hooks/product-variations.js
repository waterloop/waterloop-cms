import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { useDispatch, useSelector } from 'react-redux';
import * as productVariationActions from '../state/product-variations/actions';
import * as productVariationSelectors from '../state/product-variations/selectors';

const useProductVariations = () => {
  const params = useParams();

  const dispatch = useDispatch();
  const productVariations = useSelector(
    productVariationSelectors.allVariations,
  );
  useEffect(() => {
    (async () => {
      try {
        let newProductVariations = [];
        if (params.productId) {
          const productVariationsResponse =
            await api.products.getProductVariations(params.productId);
          // get all products
          const productsResponse = await api.products.getProducts();
          const products = productsResponse.data;

          const productName = products.find(
            (product) => product.id == params.productId,
          ).name;

          for (const productVariation of productVariationsResponse.data) {
            const variation = { ...productVariation, productName };
            newProductVariations = [...newProductVariations, variation];
          }
        }

        dispatch(
          productVariationActions.updateProductVariationsInfo(
            newProductVariations,
          ),
        );
      } catch (err) {
        console.error(
          'error fetching products in product-variations.js: ',
          err,
        );
      }
    })();
  }, [dispatch, params.productId, params.variationId]);

  return {
    productVariations,
  };
};

export default useProductVariations;
