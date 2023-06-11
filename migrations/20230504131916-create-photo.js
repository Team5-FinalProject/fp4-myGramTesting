'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Photos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Title cannot be empty"
          }
        }
      },
      caption: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Caption cannot be empty"
          }
        }
      },
      poster_image_url: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Poster image URL cannot be empty"
          },
          isUrl: {
            msg: "Invalid URL format"
          }
        }
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
    await queryInterface.dropTable('Photos');
  }
};