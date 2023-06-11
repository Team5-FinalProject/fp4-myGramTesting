'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Full name cannot be empty"
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Email cannot be empty"
          },
          isEmail: {
            msg: "Invalid email format"
          }
        }
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Username cannot be empty"
          }
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password cannot be empty"
          }
        }
      },
      profile_image_url: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Profile image URL cannot be empty"
          },
          isUrl: {
            msg: "Invalid URL format"
          }
        }
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Age cannot be empty"
          },
          isInt: {
            msg: "Invalid age format"
          }
        }
      },
      phone_number: {
        type: Sequelize.BIGINT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Phone number cannot be empty"
          },
          isInt: {
            msg: "Invalid phone number format"
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
    await queryInterface.dropTable('Users');
  }
};