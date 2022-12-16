'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "Bookings";
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert(options, [
      {
        spotId: 2,
        userId: 1,
        startDate: "2022-02-01",
        endDate: "2022-02-16"
      },
      {
        spotId: 1,
        userId: 2,
        startDate: "2022-09-06",
        endDate: "2022-09-10"
      },
      {
        spotId: 3,
        userId: 3,
        startDate: "2022-01-01",
        endDate: "2022-01-08"
      },
      {
        spotId: 4,
        userId: 2,
        startDate: "2022-03-17",
        endDate: "2022-03-20"
      },
      {
        spotId: 5,
        userId: 3,
        startDate: "2022-05-06",
        endDate: "2022-06-06"
      },
      {
        spotId: 6,
        userId: 4,
        startDate: "2022-08-05",
        endDate: "2022-08-10"
      },
    ])
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(options);
  }
};
