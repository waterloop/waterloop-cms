import { parseTimeForResponse, parseTimeFromRequest } from '../utils/db-dates';
import renameProps from '../utils/rename-props';

export const fromProductVariation = (productVariation) =>
  renameProps(productVariation, {
    variationName: 'variation_name',
    productId: 'product_id',
    lastUpdated: 'last_updated',
  });

export const toProductVariation = (productVariation) => ({
  ...renameProps(productVariation, {
    variation_name: 'variationName',
    product_id: 'productId',
    last_updated: 'lastUpdated',
  }),
  lastUpdated: parseTimeForResponse(productVariation.last_updated),
});

export const toProduct = (product) => ({
  ...renameProps(product, {}),
  lastUpdated: parseTimeForResponse(product.last_updated),
});

export const fromProduct = (product) => ({
  ...renameProps(product, {}),
  last_updated: parseTimeFromRequest(product.lastUpdated),
});
