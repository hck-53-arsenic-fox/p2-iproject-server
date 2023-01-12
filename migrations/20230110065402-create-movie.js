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
      rank:{
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      thumbnail: {
        type: Sequelize.TEXT
      },
      rating: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      },
      image:{
        type: Sequelize.TEXT
      },  
      description: {
        type: Sequelize.TEXT
      },
      trailer: {
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.TEXT
      },
      director: {
        type: Sequelize.TEXT
      },
      writers:{
        type: Sequelize.TEXT
      },
      imdbid:{
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
    await queryInterface.dropTable('Movies');
  }
};