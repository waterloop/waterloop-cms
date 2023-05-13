import renameProps from '../utils/rename-props';

export const fromProduct = (product) =>
  renameProps(product, {
    variationName: 'variation_name',
    lastUpdated: 'last_updated',
  });

export const toProduct = (product) =>
  renameProps(product, {
    variation_name: 'variationName',
    last_updated: 'lastUpdated',
  });
