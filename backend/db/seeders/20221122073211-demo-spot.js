'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
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
        description: "Good community for kids",
        price: 189
    },
    {
      ownerId: 2,
        address: "344 delmar Drive",
        city: "Seattle",
        state: "California",
        country: "United States of America",
        lat: 67.891519,
        lng: -111.451935,
        name: "House near High School",
        description: "live here and forget everything",
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
    },
    {
      ownerId: 4,
      address: '239 Lyme Street',
      city: 'San Francisco',
      state: 'California',
      country: 'United States of America',
      lat: 112.6109558,
      lng: -246.2301329,
      name: "Peaceful House w/ Heating + Hot Tub",
      description: "Stay in this peaceful house",
      price: 280
    },
    {
      ownerId: 1,
        address: "12 suttor Dr",
        city: "San Jose",
        state: "California",
        country: "United States of America",
        lat: 637.8919039,
        lng: -121.456835,
        name: "House with swimming Pool facility",
        description: "Good Playground area",
        price: 345
    },
    {
      ownerId: 3,
      address: "1541 Marietta Street",
      city: "Santa Rosa",
      state: "California",
      country: "United States of America",
      lat: 113.8919039,
      lng:122.412335,
      name: " 2 Bedroom house",
      description: "Enjoy a cozy place",
      price: 129
    }
  ], {});

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
     await queryInterface.bulkDelete(options);
  }
};
