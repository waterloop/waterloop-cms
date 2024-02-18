import * as actionTypes from '../action-types';

export const updateProductVariationsInfo = (productVariationsInfo) => ({
  type: actionTypes.PRODUCT_VARIATIONS_SET_VARIATION,
  payload: productVariationsInfo,
});
