const getProducts = (server) => () => server.get('/api/products');
const getProductVariations = (server) => (id) =>
  server.get(`/api/products/${id}/variations`);
const updateProduct = (server) => (id, updatedProductInfo) =>
  server.patch(`/api/products/${id}`, updatedProductInfo);
const updateProductVariation = (server) => (variationId, productId, updatedVariationInfo) =>
  server.patch(`/api/products/${productId}/variations/${variationId}`, updatedVariationInfo);
const addProduct = (server) => (product) => 
  server.post(`/api/products`, product);
const addProductVariation = (server) => (productVariation) => 
  server.post(`/api/products/${productVariation.productId}/variations`);
const deleteProduct = (server) => (id) =>
  server.delete(`/api/products/${id}`);
 const deleteProductVariation = (server) => (productId, variationId) =>
  server.delete(`/api/products/${productId}/variations/${variationId}`);

export default (server) => ({
  getProducts: getProducts(server),
  getProductVariations: getProductVariations(server),
  updateProduct: updateProduct(server),
  updateProductVariation:updateProductVariation(server),
  addProductaddProductVariation: addProductaddProductVariation(server),
  addProductVariation: addProductVariation(server),
  deleteProduct: deleteProduct(server),
  deleteProductVariation: deleteProductVariation(server),
});
