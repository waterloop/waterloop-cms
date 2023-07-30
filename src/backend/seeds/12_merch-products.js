const { parseTimeFromRequest } = require('../utils/db-dates');
const { ENV_IS_STAGING_OR_PROD } = require('../knexfile');

if (!ENV_IS_STAGING_OR_PROD) {
  exports.seed = function (knex) {
    return knex('merch_products')
      .del()
      .then(() => {
        return knex('merch_products').insert([
          {
            name: 'T-shirt',
            description: 'The best t-shirt there is',
            category: 'clothing',
            picture: 'https://plus.unsplash.com/premium_photo-1690164161383-f5ff30a790bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60',
            price: 15,
          },
          {
            name: 'Pants',
            description: 'The best pants there is',
            category: 'clothing',
            picture: 'https://plus.unsplash.com/premium_photo-1690164161383-f5ff30a790bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60',
            price: 16,
          },
          {
            name: 'Sweater',
            description: 'The best sweater there is',
            category: 'clothing',
            picture: 'imgs/photo1',
            price: 17,
          },
          {
            name: 'Sticker',
            description: 'The best sticker there is',
            category: 'miscallaneous',
            picture: 'imgs/photo1',
            price: 18,
          },
        ]);
      })
      .then(() => {
        return knex('merch_product_variations').del();
      })
      .then(async () => {
        const products = await knex('merch_products');
        return knex('merch_product_variations').insert([
          {
            variation_name: 'red',
            product_id: products[0].id,
            price: 15,
            stock: 7,
            picture: 'imgs/photo1',
            last_updated: parseTimeFromRequest(Date()),
          },
          {
            variation_name: 'black',
            product_id: products[0].id,
            price: 15,
            stock: 3,
            picture: 'imgs/photo2',
            last_updated: parseTimeFromRequest(Date()),
          },
          {
            variation_name: 'gray',
            product_id: products[1].id,
            price: 25,
            stock: 2,
            picture: 'imgs/photo3',
            last_updated: parseTimeFromRequest(Date()),
          },
          {
            variation_name: 'black',
            product_id: products[1].id,
            price: 25,
            stock: 6,
            picture: 'imgs/photo4',
            last_updated: parseTimeFromRequest(Date()),
          },
          {
            variation_name: 'rainbow',
            product_id: products[2].id,
            price: 20,
            stock: 15,
            picture: 'imgs/photo5',
            last_updated: parseTimeFromRequest(Date()),
          },
          {
            variation_name: 'pink',
            product_id: products[2].id,
            price: 20,
            stock: 12,
            picture: 'imgs/photo6',
            last_updated: parseTimeFromRequest(Date()),
          },
          {
            variation_name: 'waterloop',
            product_id: products[3].id,
            price: 1,
            stock: 20,
            picture: 'imgs/photo7',
            last_updated: parseTimeFromRequest(Date()),
          },
          {
            variation_name: 'hyperloop',
            product_id: products[3].id,
            price: 1,
            stock: 20,
            picture: 'imgs/photo8',
            last_updated: parseTimeFromRequest(Date()),
          },
        ]);
      });
  };
} else {
  exports.seed = function (knex) {
    return Promise.resolve();
  };
}
