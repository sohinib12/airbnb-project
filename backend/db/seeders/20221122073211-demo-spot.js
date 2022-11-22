'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Spots';

module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert(options, [
    {
      ownerId: 1,
        address: "200 walnut ave",
        city: "Fremont",
        state: "California",
        country: "United States of America",
        lat: 47.437698,
        lng: 11.895828,
        name: "House",
        description: "Good community",
        price: 189
    },
    {
      ownerId: 2,
        address: "344 delmar Drive",
        city: "Seattle",
        state: "Washington",
        country: "United States of America",
        lat: 67.891519,
        lng: -111.451935,
        name: "House near High School",
        description: "Good Playground area",
        price: 345
    },
    {
      ownerId: 3,
        address: "christy lane",
        city: "San Ramon",
        state: "California",
        country: "United States of America",
        lat: 51.712934,
        lng: 89.912539,
        name: "House with beach view",
        description: "Place where people can relax",
        price: 678
    }
  ], {});

  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(options);
  }
};
