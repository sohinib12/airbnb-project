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
        address: "12th delmonte Drive",
        city: "Del Monte Forest",
        state: "California",
        country: "United States of America",
        lat: 112.492019,
        lng: -112.712935,
        name: "Luxury stay in Del Monte Forest",
        description: "An outdoor cabana echoes the straight lines of the tallest trees",
        price: 4286
    },
    {
      ownerId: 2,
        address: "windy st",
        city: "Joshua Tree",
        state: "California",
        country: "United States of America",
        lat: 113.891519,
        lng: -101.451935,
        name: "The Kellogg Doolittle House",
        description: "This is the most amazing place in the world! Every detail of this house can be called a work of art!",
        price: 9500
    },
    {
      ownerId: 3,
        address: "14 christy ln",
        city: "Malibu",
        state: "California",
        country: "United States of America",
        lat: 67.891519,
        lng: -111.451935,
        name: "Eagle's watch",
        description: "Eagle’s Watch has the best unobstructed panoramic view in Malibu",
        price: 1600
    },
    {
      ownerId: 4,
        address: "1344 plaza drive",
        city: "Malibu",
        state: "California",
        country: "United States of America",
        lat: 112.893459,
        lng: -109.423435,
        name: "The Malibu Dream Resort",
        description: "Quietly nestled in the heart of the Malibu Mountains",
        price: 10061
    },
    {
      ownerId: 3,
        address: "3 Rodeo Drive",
        city: "Beverly Hills",
        state: "California",
        country: "United States of America",
        lat: 63.891519,
        lng: -111.451935,
        name: "French Neoclassical villa",
        description: "Enjoy sumptuous days bathing in the elevated hot tub, floating in the swimming pool, and sipping cool drinks on loungers and sunbeds.",
        price: 3453
    },
    {
      ownerId: 2,
      address: "344 Lakewood Drive",
        city: "Beverly Hills",
        state: "California",
        country: "United States of America",
        lat: 90.678519,
        lng: -111.345935,
        name: "Chateau de Laurel",
        description: "Classic French and American contemporary architecture come together to create this Beverly Hills Chateau",
        price: 15826
    },
    {
      ownerId: 1,
        address: "344 delmar",
        city: "Pasadena",
        state: "California",
        country: "United States of America",
        lat: 67.891123,
        lng: -121.456105,
        name: "Romantic Spanish Style Mansion",
        description: "Welcome to our 1929 Spanish Revival home by famed designer Paul Williams built-in 1929",
        price: 1345
    },
    {
      ownerId: 4,
        address: "346 calisto Drive",
        city: "Glenbrook",
        state: "California",
        country: "United States of America",
        lat: 12.624519,
        lng: -111.912935,
        name: "Villa De Lago The Lake House",
        description: "lThe Lake House is located in a secluded enclave in historic Cave Rock Nevada",
        price: 1250
    },
    {
      ownerId: 1,
        address: "7 barista ln",
        city: "Penngrove",
        state: "California",
        country: "United States of America",
        lat: 90.281319,
        lng: -91.301535,
        name: "Milk House,Sonoma Mountain Terrace",
        description: "On cool mornings your will be greeted by a blanket of fog in the valley",
        price: 189
    },
    {
      ownerId: 1,
        address: "156 moss Drive",
        city: "Moss Beach",
        state: "California",
        country: "United States of America",
        lat: 123.710319,
        lng: -102.890135,
        name: "Ocean Front Home",
        description: "Beautiful walk to Moss Beach Distillery!",
        price: 980
    },
    {
      ownerId: 3,
        address: "walnut ave",
        city: "Valley Ford",
        state: "California",
        country: "United States of America",
        lat: 67.891519,
        lng: -111.451935,
        name: "West Marin Historic Schoolhouse",
        description: "A uniquely-peaceful ecological garden, surrounded by gently rolling hills of west Marin",
        price: 301
    },
    {
      ownerId: 4,
        address: "5 Rodeo Drive",
        city: "Palm Springs",
        state: "California",
        country: "United States of America",
        lat: 67.891519,
        lng: -111.451935,
        name: "Swiss Miss house",
        description: "breathtaking mountain views are the setting for this magnificent Swiss Miss house newly remodeled with tropical flair",
        price: 1953
    },
    {
      ownerId: 2,
        address: "78 valley Drive",
        city: "Yucca Valley",
        state: "California",
        country: "United States of America",
        lat: 89.861219,
        lng: -121.450145,
        name: "Jackrabbit Wash",
        description: "The house is a classic mid-century style",
        price: 771
    },
    {
      ownerId: 1,
        address: "34 Bel Drive",
        city: "Bel Air",
        state: "California",
        country: "United States of America",
        lat: 123.781359,
        lng: -114.451935,
        name: "Sprawling Private Luxury Villa",
        description: "Mediterranean-modern style home with magnificent views",
        price: 3674
    },
    {
      ownerId: 2,
        address: "21 calisto Drive",
        city: "Palm Springs",
        state: "California",
        country: "United States of America",
        lat: 110.203119,
        lng: -101.018335,
        name: "The Pond Estate",
        description: "live here and forget everything",
        price: 8500
    },

  ], {});

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
     await queryInterface.bulkDelete(options);
  }
};
