'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BMIs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      country: {
        type: Sequelize.STRING,
      },
      iso_a3: {
        type: Sequelize.STRING,
      },
      currency_code: {
        type: Sequelize.STRING,
      },
      local_price: {
        type: Sequelize.FLOAT,
      },
      dollar_ex: {
        type: Sequelize.FLOAT,
      },
      rupiah_ex: {
        type: Sequelize.FLOAT,
      },
      rupiah_ex_10000: {
        type: Sequelize.FLOAT,
      },
      dollar_price: {
        type: Sequelize.FLOAT,
      },
      rupiah_price: {
        type: Sequelize.FLOAT,
      },
      dollar_ppp: {
        type: Sequelize.FLOAT,
      },
      rupiah_ppp: {
        type: Sequelize.FLOAT,
      },
      rupiah_ppp_10000: {
        type: Sequelize.FLOAT,
      },
      GDP_bigmac: {
        type: Sequelize.FLOAT,
      },
      dollar_valuation: {
        type: Sequelize.FLOAT,
      },
      rupiah_valuation: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable('BMIs');
  },
};
