'use strict';

// const { mapFinderOptions } = require('sequelize/types/utils');

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "SpotImages"
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/37425e33-8fd5-4869-8ea9-e5b2cb5db9f9.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/4e367eea-801c-43fa-a7f0-4020a57ac21e.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/8f4290bc-2128-44e1-b4f3-9c470c69dd95.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-34446612/original/298e2f93-d382-44d9-a5a7-b69658b234c2.jpeg',
        preview: true
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/b5224e95-8739-473b-bf0a-8aefb8757f09.jpg",
        preview: true
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/8cf22631-8489-405b-b265-ee8f1f76352b.jpg',
        preview: true
      },
    ])
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(options);
  }
};
