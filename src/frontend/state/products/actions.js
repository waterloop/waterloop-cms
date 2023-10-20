import * as actionTypes from '../action-types';

export const updateProductInfo = (productInfo) => ({
  type: actionTypes.PRODUCTS_SET_PRODUCT,
  payload: productInfo,
});
