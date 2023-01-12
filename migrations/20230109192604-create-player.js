'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      teamName: {
        type: Sequelize.STRING
      },
      teamShort: {
        type: Sequelize.STRING
      },
      playerNumber: {
        type: Sequelize.INTEGER
      },
      height: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.STRING
      },
      birthDate: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      experience: {
        type: Sequelize.INTEGER
      },
      lastAttended: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      imgUrl: {
        type: Sequelize.STRING
      },
      logoUrl: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Players');
  }
};