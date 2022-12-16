'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "ReviewImages"
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: "https://a0.muscache.com/im/pictures/e13e7070-5b55-47fe-8225-c815a24c93ac.jpg"
      },
      {
        reviewId: 2,
        url: "https://a0.muscache.com/im/pictures/2710e24c-a236-4be4-a23d-beee01af53c8.jpg"
      },
      {
        reviewId: 3,
        url: "https://a0.muscache.com/im/pictures/9c048936-79bf-47e9-b0ab-dbdd4ccb16d3.jpg"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(options);
  }
};
