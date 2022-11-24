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
        url: 'url',
        preview: true
      },
      {
        spotId: 2,
        url: "url",
        preview: true
      },
      {
        spotId: 3,
        url: 'url',
        preview: true
      },
    ])
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(options);
  }
};
