import { useEffect } from 'react';
import api from '../api';
import { useDispatch, useSelector } from 'react-redux';
import * as productActions from '../state/products/actions';
import * as productSelectors from '../state/products/selectors';

const useProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector(productSelectors.allProducts);
  useEffect(() => {
    (async () => {
      try {
        const productsResponse = await api.products.getProducts();

        const newProducts = productsResponse.data;

        dispatch(productActions.updateProductInfo(newProducts));
      } catch (err) {
        console.error(err);
      }
    })();
  }, [dispatch]);

  return {
    geeseInfo,
  };
};

export default useProducts;
