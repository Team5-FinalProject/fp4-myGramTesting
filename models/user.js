"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Photo);
      this.hasMany(models.Comment);
      this.hasMany(models.Socialmedia);
    }
  }
  User.init(
    {
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Full name cannot be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Email cannot be empty",
          },
          isEmail: {
            msg: "Invalid email format",
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Username cannot be empty",
          },
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password cannot be empty",
          },
        },
      },
      profile_image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Profile image URL cannot be empty",
          },
          isUrl: {
            msg: "Invalid URL format",
          },
        },
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Age cannot be empty",
          },
          isInt: {
            msg: "Age must be an integer",
          },
        },
      },
      phone_number: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Phone number cannot be empty",
          },
          isInt: {
            msg: "Phone number must be an integer",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeSave: (user, options) => {
          const hashedPassword = hashPassword(user.password);
          user.password = hashedPassword;
        }
      },
    }
  );
  return User;
};
