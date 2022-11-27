const { ENV_IS_STAGING_OR_PROD } = require('../knexfile');

if (!ENV_IS_STAGING_OR_PROD) {
  exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('geese-features')
      .del()
      .then(() => {
        // Inserts seed entries
        return knex('geese-features').insert([
          {
            name: 'John Doe',
            picture: 'https://picsum.photos/200/300',
            description:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas accusantium dolorem, beatae possimus nesciunt ab? Illum atque doloremque fugit ipsam quibusdam eveniet magnam quod, amet id obcaecati et odio praesentium.',
          },
          {
            name: 'John Doe 2',
            picture: 'https://picsum.photos/200/300',
            description:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas accusantium dolorem, beatae possimus nesciunt ab? Illum atque doloremque fugit ipsam quibusdam eveniet magnam quod, amet id obcaecati et odio praesentium.',
          },
          {
            name: 'John Doe 3',
            picture: 'https://picsum.photos/200/300',
            description:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas accusantium dolorem, beatae possimus nesciunt ab? Illum atque doloremque fugit ipsam quibusdam eveniet magnam quod, amet id obcaecati et odio praesentium.',
          },
        ]);
      });
  };
} else {
  exports.seed = function (knex) {
    return Promise.resolve();
  };
}
