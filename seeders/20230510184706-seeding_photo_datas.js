'use strict';

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
    await queryInterface.bulkInsert('Photos', [{
      title: 'Photo 1',
      caption: 'Caption 1',
      poster_image_url: 'https://i.imgur.com/1.jpg',
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Photo 2',
      caption: 'Caption 2',
      poster_image_url: 'https://i.imgur.com/2.jpg',
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
