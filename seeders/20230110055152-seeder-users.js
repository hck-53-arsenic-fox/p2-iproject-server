'use strict';

const { hashPass } = require('../helpers/bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let dataUser = require('../data/users.json')
   dataUser.forEach((el) => {
    el.createdAt = new Date()
    el.updatedAt = new Date()
    el.password = hashPass(el.password)
   })
   await queryInterface.bulkInsert('Users', dataUser)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  }
};
