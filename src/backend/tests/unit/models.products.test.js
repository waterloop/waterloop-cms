import * as ProductsModel from '../../models/products';
import chai from 'chai';
const expect = chai.expect;


const productVariationCamel = {
  'variationName': 'test',
  'productId': 'test',
  'lastUpdated': 9234234324,
}

const product_variation_snake = {
  'variation_name': 'test',
  'product_id': 'test',
  'last_updated': "1970-04-17 21:03:54.324",
}

describe('Model: Product Variation', () => {
  describe('fromProductVariation', () => {
    it('should return a new object with keys that are snake case', () => {
      expect(ProductsModel.fromProductVariation(productVariationCamel)).to.deep.equal(product_variation_snake);
    })
  })
})
