import {
  fromProductVariation,
  toProductVariation,
  toProduct,
  fromProduct,
} from '../models/products';

const getProducts = (db) => () =>
  db('products')
    .then((res) => {
      return res.map(toProduct);
    })
    .catch((err) => {
      console.error(`Error in getProducts: ${err}`);
      throw err;
    });

const getProductVariations = (db) => () =>
  db('product_variations')
    .then((res) => {
      return res.map(toProductVariation);
    })
    .catch((err) => {
      console.error(`Error in getProductVariations: ${err}`);
      throw err;
    });

const getProductById = (db) => (id) =>
  db('products')
    .where({ id })
    .then((res) => {
      return res.map(toProduct);
    })
    .catch((err) => {
      console.error(`Error in getProductById: ${err}`);
      throw err;
    });

const getProductVariationsById = (db) => (variationId) =>
  db('product_variations')
    .where({ variationId })
    .then((res) => {
      return res.map(toProductVariation);
    })
    .catch((err) => {
      console.error(`Error in getProductVariationsById: ${err}`);
      throw err;
    });

const addProduct = (db) => (productInfo) =>
  db('products')
    .insert(fromProduct(productInfo))
    .returning('id')
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.error(`Error in addProduct: ${err}`);
      throw err;
    });

const addProductVariation = (db) => (productVariationInfo) =>
  db('product_variations')
    .insert(fromProductVariation(productVariationInfo))
    .returning('id')
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.error(`Error in addProductVariation: ${err}`);
      throw err;
    });

const updateProductById = (db) => (id, productInfo) =>
  db('products')
    .where({
      id,
    })
    .update({
      ...fromProduct(productInfo),
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.error(`Error in updateProductById: ${err}`);
      throw err;
    });

const updateProductVariationById = (db) => (id, productVariationInfo) =>
  db('product_variations')
    .where({
      id,
    })
    .update({
      ...fromProductVariation(productVariationInfo),
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.error(`Error in updateProductVariationById: ${err}`);
      throw err;
    });

const deleteProductById = (db) => (id) =>
  db('products')
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
  db('product_variations')
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
  getProductVariationsById: getProductVariations(db),
  addProduct: addProduct(db),
  addProductVariation: addProductVariation(db),
  deleteProductById: deleteProductById(db),
  deleteProductVariationById: deleteProductVariationById(db),
});
