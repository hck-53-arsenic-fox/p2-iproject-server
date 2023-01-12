'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Movies", "genre", { type: Sequelize.STRING,})
    /**
     * Add altering commands here.
     *  await queryInterface.addColumn("Posts", "status", { type: Sequelize.STRING,
  defaultValue:"active"})
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Movies", "genre", {});
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
