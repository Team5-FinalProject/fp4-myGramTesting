const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class UserController {
  static async register(req, res) {
    const { email, full_name, username, password, profile_image_url, age, phone_number } = req.body;
    const validateEmail = await User.findOne({
      where: {
        email
      }
    });
    if (validateEmail) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }
    User.create({
      email,
      full_name,
      username,
      password,
      profile_image_url,
      age,
      phone_number
    })
      .then((data) => {
        res.status(201).json({
          "user": {
            "email": data.email,
            "full_name": data.full_name,
            "username": data.username,
            "profile_image_url": data.profile_image_url,
            "age": data.age,
            "phone_number": data.phone_number
          }
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Internal server error",
          err,
        });
      });
  }

  static async login(req, res) {
    const { email, password } = req.body;
    User.findOne({
      where: {
        email
      }
    })
      .then((user) => {
        if (!user) {
          throw {
            name: "User Login Error",
            devMassage: `User with email ${email} not found`
          }
        }
        const isCorrect = comparePassword(password, user.password);
        if (!isCorrect) {
          throw {
            name: "User Login Error",
            devMassage: `User password with email ${email} dose not match`
          }
        }
        let response = {
          id: user.id,
          email: user.email
        }
        const token = generateToken(response);
        return res.status(200).json({ token });
      })
      .catch((err) => {
        return res.status(401).json(err);
      });
  }

  static async updateUserById(req, res) {
    let id = +req.params.id;
    const { email, full_name, username, password, profile_image_url, age, phone_number } = req.body;
    const validateUser = await User.findOne({
      where: {
        id
      }
    });
    const validateEmail = await User.findOne({
      where: {
        email
      }
    });
    if (!validateUser) {
      return res.status(400).json({
        message: "User not found"
      });
    }
    if (validateEmail) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }
    let data = {
      email,
      full_name,
      username,
      password,
      profile_image_url,
      age,
      phone_number
    };
    User.update(data, {
      where: {
        id
      },
      returning: true
    })
      .then((data) => {
        res.status(200).json({
          "user": {
            "email": data[1][0].email,
            "full_name": data[1][0].full_name,
            "username": data[1][0].username,
            "profile_image_url": data[1][0].profile_image_url,
            "age": data[1][0].age,
            "phone_number": data[1][0].phone_number
          }
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static async deleteUserById(req, res) {
    let id = +req.params.id;
    const validateUser = await User.findOne({
      where: {
        id
      }
    });
    if (!validateUser) {
      return res.status(400).json({
        message: "User not found"
      });
    }
    User.destroy({
      where: {
        id
      }
    })
      .then((data) => {
        res.status(200).json({
          "message": "Your account has been deleted"
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
}

module.exports = UserController;
