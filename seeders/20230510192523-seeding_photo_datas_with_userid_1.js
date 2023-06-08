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
    await queryInterface.bulkInsert('Photos', [
      {
        title: 'Photo 1 userid 1',
        poster_image_url: 'https://picsum.photos/200/300',
        caption: 'Photo 1 caption',
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Photo 2 userid 1',
        poster_image_url: 'https://picsum.photos/200/300',
        caption: 'Photo 2 caption',
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Photo 3 userid 1',
        poster_image_url: 'https://picsum.photos/200/300',
        caption: 'Photo 3 caption',
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
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
