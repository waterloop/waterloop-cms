const { ENV_IS_STAGING_OR_PROD } = require('../knexfile');

if (!ENV_IS_STAGING_OR_PROD) {
  exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('blogs')
      .del()
      .then(() => {
        // Inserts seed entries
        return knex('blogs').insert([
          {
            author: 'John Doe',
            title: 'The Competition',
            summary:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas accusantium dolorem, beatae possimus nesciunt ab? Illum atque doloremque fugit ipsam quibusdam eveniet magnam quod, amet id obcaecati et odio praesentium.',
            date: '23-May-2021',
            link: 'string',
            image: 'https://picsum.photos/200/300',
            closed: true,
          },
          {
            author: 'John Doe',
            title: 'The Competition',
            summary:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas accusantium dolorem, beatae possimus nesciunt ab? Illum atque doloremque fugit ipsam quibusdam eveniet magnam quod, amet id obcaecati et odio praesentium.',
            date: '20-May-2021',
            link: 'string',
            image: 'https://picsum.photos/200/300',
            closed: false,
          },
          {
            author: 'John Doe',
            title: 'The Competition',
            summary:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas accusantium dolorem, beatae possimus nesciunt ab? Illum atque doloremque fugit ipsam quibusdam eveniet magnam quod, amet id obcaecati et odio praesentium.',
            date: '10-May-2021',
            link: 'string',
            image: 'https://picsum.photos/200/300',
            closed: false,
          },
          {
            author: 'John Doe',
            title: 'The Competition',
            summary:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas accusantium dolorem, beatae possimus nesciunt ab? Illum atque doloremque fugit ipsam quibusdam eveniet magnam quod, amet id obcaecati et odio praesentium.',
            date: '1-May-2021',
            link: 'string',
            image: 'https://picsum.photos/200/300',
            closed: true,
          },
        ]);
      });
  };
} else {
  exports.seed = function (knex) {
    return Promise.resolve();
  }
}

