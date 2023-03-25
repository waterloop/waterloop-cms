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
            content: 'Lorem ipsum',
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
            content: 'Another major milestone for the team is the full implementation of their coil-winding machine that winds up copper coils. In the fall term, They conducted research on the machine, and gained robust knowledge of every single wire inside the machine. After successfully overcoming the complex challenges, the team created a specialized program to run the machine, leading to a ten-fold improvement in coil manufacturing efficiency. The team is now ready to accomplish further advancements with the coil. In the future, this team of dedicated engineers will design a new sensor suite for the future projects, and further explore Ansys simulations’ full potential by utilizing cloud computing providers’ services. They are driven to invest in research and development to push boundaries, and they are passionate about sparking interest in hyperloop among students through exciting outreach initiatives and programs. We look forward to seeing how much this team can achieve by the end of this term, and we cannot wait to share more of Waterloop\'s latest achievements with you!',
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
            content: 'Lorem ipsum',
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
            content: 'Lorem ipsum',
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

