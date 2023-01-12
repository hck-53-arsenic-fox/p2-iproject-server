'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING, 
        allowNull: false, 
      },
      description: {
        type: Sequelize.TEXT, 
        allowNull: false, 
      },
      imageUrl: {
        type: Sequelize.STRING, 
        allowNull: false, 
      },
      trailer: {
        type: Sequelize.STRING, 
        allowNull: false, 
      },
      duration: {
        type: Sequelize.INTEGER, 
        allowNull: false, 
      },
      producer: {
        type: Sequelize.STRING, 
        allowNull: false, 
      },
      director: {
        type: Sequelize.STRING, 
        allowNull: false, 
      },
      writer: {
        type: Sequelize.STRING, 
        allowNull: false, 
      },
      cast: {
        type: Sequelize.STRING, 
        allowNull: false, 
      },
      distributor: {
        type: Sequelize.STRING, 
        allowNull: false, 
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
    await queryInterface.dropTable('Movies');
  }
};