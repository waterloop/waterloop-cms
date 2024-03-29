import {
  fromProductVariation,
  toProductVariation,
} from '../models/products';

const getProducts = (db) => () =>
  db('merch_products')
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(`Error in getProducts: ${err}`);
      throw err;
    });

const getProductVariations = (db) => (productId) =>
  db('merch_product_variations')
  .where({
    product_id: productId
  })
    .then((res) => {
      return res.map(toProductVariation);
    })
    .catch((err) => {
      console.error(`Error in getProductVariations: ${err}`);
      throw err;
    });

const getProductById = (db) => (id) =>
  db('merch_products')
    .where({ id })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(`Error in getProductById: ${err}`);
      throw err;
    });

const getProductVariationsById = (db) => (variationId) =>
  db('merch_product_variations')
    .where({ id: variationId })
    .then((res) => {
      return res.map(toProductVariation);
    })
    .catch((err) => {
      console.error(`Error in getProductVariationsById: ${err}`);
      throw err;
    });

const addProduct = (db) => (productInfo) =>
  db('merch_products')
    .insert(productInfo)
    .returning(['id', 'name', 'description', 'category'])
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.error(`Error in addProduct: ${err}`);
      throw err;
    });

const addProductVariation = (db) => (productVariationInfo) =>
  db('merch_product_variations')
    .insert(fromProductVariation(productVariationInfo))
    .returning(['id', 'variation_name', 'product_id', 'price', 'stock', 'picture'])
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.error(`Error in addProductVariation: ${err}`);
      throw err;
    });

const updateProductById = (db) => (id, productInfo) =>
  db('merch_products')
    .where({
      id,
    })
    .update(
      productInfo,
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.error(`Error in updateProductById: ${err}`);
      throw err;
    });

const updateProductVariationById = (db) => (variationId, productId, productVariationInfo) =>
  db('merch_product_variations')
    .where({
      id: variationId,
      product_id: productId
    })
    .update(
      fromProductVariation(productVariationInfo),
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.error(`Error in updateProductVariationById: ${err}`);
      throw err;
    });

const deleteProductById = (db) => (id) =>
  db('merch_products')
    .where({
      id,
    })
    .del()
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.error(`Error in deleteProductById: ${err}`);
      throw err;
    });

const deleteProductVariationById = (db) => (id) =>
  db('merch_product_variations')
    .where({
      id,
    })
    .del()
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.error(`Error in deleteProductVariationsById: ${err}`);
      throw err;
    });

export default (db) => ({
  getProducts: getProducts(db),
  getProductVariations: getProductVariations(db),
  getProductById: getProductById(db),
  getProductVariationsById: getProductVariationsById(db),
  addProduct: addProduct(db),
  addProductVariation: addProductVariation(db),
  updateProductById: updateProductById(db),
  updateProductVariationById: updateProductVariationById(db),
  deleteProductById: deleteProductById(db),
  deleteProductVariationById: deleteProductVariationById(db),
});
