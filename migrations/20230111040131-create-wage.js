'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Wages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bigMacPriceUsd: {
        type: Sequelize.FLOAT,
      },
      avgWageUsd: {
        type: Sequelize.FLOAT,
      },
      CountryCode: {
        type: Sequelize.STRING,
        references: {
          model: 'Countries',
          key: 'countryCode',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Wages');
  },
};
