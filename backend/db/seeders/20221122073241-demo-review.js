'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "Reviews"
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        review: "great spot",
        stars: 3
      },
      {
        spotId: 2,
        userId: 3,
        review: "well maintained",
        stars: 5
      },
      {
        spotId: 3,
        userId: 1,
        review: "this place has good vibes",
        stars: 2
      },
      {
        spotId: 4,
        userId: 4,
        review: "great place to hangout",
        stars: 4
      },
      {
        spotId: 6,
        userId: 3,
        review: "a beautiful getaway",
        stars: 5
      },
      {
        spotId: 3,
        userId: 4,
        review: "perfect spot",
        stars: 4
      }
    ])
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(options);
  }
};
