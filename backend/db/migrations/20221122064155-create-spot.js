'use strict';
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "Spots";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Users'
        }
      },
      address: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      city: {
        type: Sequelize.TEXT,
        allowNull:false,
      },
      state: {
        type: Sequelize.TEXT,
        allowNull:false,
      },
      country: {
        type: Sequelize.TEXT,
        allowNull:false,
      },
      lat: {
        type: Sequelize.NUMERIC
      },
      lng: {
        type: Sequelize.NUMERIC
      },
      name: {
        type: Sequelize.TEXT,
        allowNull:false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull:false,
      },
      price: {
        type: Sequelize.NUMERIC,
        allowNull:false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(options);
  }
};
