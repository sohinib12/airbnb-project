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
        review: "Absolutely stunning! Perfect for a coupes getaway!",
        stars: 4
      },
      {
        spotId: 2,
        userId: 3,
        review: "Absolutely gorgeous scenery and setting!",
        stars: 5
      },
      {
        spotId: 3,
        userId: 1,
        review: "The sweetest little retreat!! I’ll definitely be back!",
        stars: 2
      },
      {
        spotId: 4,
        userId: 4,
        review: "The stay was amazing a very unique experience will definitely be booking again in the future",
        stars: 4
      },
      {
        spotId: 5,
        userId: 3,
        review: "We had a wonderful stay",
        stars: 5
      },
      {
        spotId: 6,
        userId: 4,
        review: "Great location, great outdoor space",
        stars: 4
      },
      {
        spotId: 7,
        userId: 2,
        review: "Wonderful place to stay, the home had everything we needed location was fantastic!",
        stars: 3
      },
      {
        spotId: 8,
        userId: 3,
        review: "Such a great spot!! We will be coming back for sure.",
        stars: 5
      },
      {
        spotId: 9,
        userId: 1,
        review: "this place has good vibes",
        stars: 2
      },
      {
        spotId: 10,
        userId: 4,
        review: "Great clean house. Super easy access and communication. What else do you want?",
        stars: 4
      },
      {
        spotId: 11,
        userId: 3,
        review: "The hosts we wonderful, check in was seamless, and the property was just stunning.",
        stars: 5
      },
      {
        spotId: 12,
        userId: 4,
        review: "It was the most beautiful home, perfect location, and extremely comfortable and well appointed. It was the perfect place to come together with family.",
        stars: 4
      },
      {
        spotId: 13,
        userId: 2,
        review: "This is an amazing house renting ever in my life! Everything is perfect and gorgeous!",
        stars: 3
      },
      {
        spotId: 14,
        userId: 3,
        review: "Great property. Looked better then shown online!",
        stars: 5
      },
      {
        spotId: 15,
        userId: 1,
        review: "What a totally incredible home!! Such a gem. We were blown away by the space and the very perfect hot tub!",
        stars: 5
      },
    ])
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(options);
  }
};
