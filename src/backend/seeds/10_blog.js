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
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas accusantium dolorem, beatae possimus nesciunt ab? Illum atque doloremque fugit ipsam quibusdam eveniet magnam quod',
            date: '23-May-2021',
            link: 'https://example.com/',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis vitae et leo duis ut diam quam. Mauris sit amet massa vitae tortor condimentum lacinia. Id eu nisl nunc mi ipsum faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis vitae et leo duis ut diam quam. Mauris sit amet massa vitae tortor condimentum lacinia. Id eu nisl nunc mi ipsum faucibus.',
            image: 'https://storage.googleapis.com/waterloop_cms_image_upload/1614225359133-waterloop1.png',
            closed: true,
            category: 'Media Appearance',
            visibility: 'Public',
          },
          {
            author: 'John Doe',
            title: 'The Competition',
            summary:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas accusantium dolorem, beatae possimus nesciunt ab? Illum atque doloremque fugit ipsam quibusdam eveniet magnam quod',
            date: '20-May-2021',
            link: 'https://example.com/',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis vitae et leo duis ut diam quam. Mauris sit amet massa vitae tortor condimentum lacinia. Id eu nisl nunc mi ipsum faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis vitae et leo duis ut diam quam. Mauris sit amet massa vitae tortor condimentum lacinia. Id eu nisl nunc mi ipsum faucibus.',
            image: 'https://storage.googleapis.com/waterloop_cms_image_upload/1614225359139-waterloop2.png',
            closed: false,
            category: 'Blog',
            visibility: 'Public',
          },
          {
            author: 'John Doe',
            title: 'The Competition',
            summary:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas accusantium dolorem, beatae possimus nesciunt ab? Illum atque doloremque fugit ipsam quibusdam eveniet magnam quod',
            date: '10-May-2021',
            link: 'https://example.com/',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis vitae et leo duis ut diam quam. Mauris sit amet massa vitae tortor condimentum lacinia. Id eu nisl nunc mi ipsum faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis vitae et leo duis ut diam quam. Mauris sit amet massa vitae tortor condimentum lacinia. Id eu nisl nunc mi ipsum faucibus.',
            image: 'https://storage.googleapis.com/waterloop_cms_image_upload/1614226228513-waterloop1.png',
            closed: false,
            category: 'Media Appearance',
            visibility: 'Hidden',
          },
          {
            author: 'John Doe',
            title: 'The Competition',
            summary:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas accusantium dolorem, beatae possimus nesciunt ab? Illum atque doloremque fugit ipsam quibusdam eveniet magnam quod',
            date: '1-May-2021',
            link: 'https://example.com/',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis vitae et leo duis ut diam quam. Mauris sit amet massa vitae tortor condimentum lacinia. Id eu nisl nunc mi ipsum faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis vitae et leo duis ut diam quam. Mauris sit amet massa vitae tortor condimentum lacinia. Id eu nisl nunc mi ipsum faucibus.',
            image: 'https://storage.googleapis.com/waterloop_cms_image_upload/1614482400810-waterloop2.png',
            closed: true,
            category: 'Blog',
            visibility: 'Hidden',
          },
        ]);
      });
  };
} else {
  exports.seed = function (knex) {
    return Promise.resolve();
  }
}

