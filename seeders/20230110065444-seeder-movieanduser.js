'use strict';
const axios = require("axios");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    try {
      const { data } = await axios({
        method: 'GET',
        url: 'https://imdb-top-100-movies.p.rapidapi.com/',
        headers: {
          'X-RapidAPI-Key': 'df882b3492mshe79e40ba2445ecep1e03e5jsn271c6c8d22a5',
          'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
        }
      })
      data.forEach(el => {
        delete el.id
        el.genre = JSON.stringify(el.genre)
        el.writers = JSON.stringify(el.writers)
        el.director = JSON.stringify(el.director)
        el.createdAt = new Date()
        el.updatedAt = new Date()
      })
      let dataUser = require("../data/user.json")
      dataUser.forEach(el => {
        el.createdAt = new Date()
        el.updatedAt = new Date()
      })
      await queryInterface.bulkInsert('Users', dataUser)
      await queryInterface.bulkInsert('Movies', data)
    } catch (error) {
      console.log(error);
    }
    // axios.request(options).then(function (response) {
    //   console.log(response.data);
    // }).catch(function (error) {
    //   console.error(error);
    // });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', {})
    await queryInterface.bulkDelete('Movies', {})
  }
};
