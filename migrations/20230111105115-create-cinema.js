'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cinemas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ScheduleId: {
        type: Sequelize.INTEGER, 
        allowNull: false, 
        references : {
          model: "Schedules", 
          key: "id"
        }
      },
      UserId: {
        type: Sequelize.INTEGER, 
        allowNull: false, 
        references : {
          model: "Users", 
          key: "id"
        }
      },
      seatNumber: {
        type: Sequelize.INTEGER, 
        allowNull: false, 
      },
      status: {
        type: Sequelize.STRING, 
        allowNull: false, 
      },
      transfer_recipe: {
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
    await queryInterface.dropTable('Cinemas');
  }
};