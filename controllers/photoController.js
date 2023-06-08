const { Photo, User, Comment } = require("../models");
const comment = require("../models/comment");

class PhotoController {
  static async getAllPhotos(req, res) {
    Photo.findAll({
      where: {
        UserId: res.locals.user.id
      },
      include: [
        {
          model: Comment,
          attributes: ['comment'],
          include: [
            {
              model: User,
              attributes: ['username']
            }
          ]
        },
        {
          model: User,
          attributes: ['id','username', 'profile_image_url']
        }
      ]
    })
      .then((photos) => {
        if (photos.length === 0) {
          res.status(200).json({
            "message": "You have no photos"
          });
        } else {
          res.status(200).json({photos});
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static async createPhoto(req, res) {
    const { title, caption, poster_image_url } = req.body;
    const user = res.locals.user;
    Photo.create({
      title,
      caption,
      poster_image_url,
      UserId: user.id
    })
      .then((data) => {
        res.status(201).json(
          {
            "id": data.id,
            "poster_image_url": data.poster_image_url,
            "title": data.title,
            "caption": data.caption,
            "UserId": data.UserId,
          }
        );
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }

  static async updatePhotoById(req, res) {
    let id = +req.params.id;
    const { title, caption, poster_image_url, UserId } = req.body;
    let data = {
      title,
      caption,
      poster_image_url,
      UserId,
    };
    Photo.update(data, {
      where: {
        id,
      },
      returning: true,
    })
      .then((data) => {
        res.status(200).json({
          "Photo":
          {
            "id": data[1][0].id,
            "title": data[1][0].title,
            "caption": data[1][0].caption,
            "poster_image_url": data[1][0].poster_image_url,
            "UserId": data[1][0].UserId,
            "createdAt": data[1][0].createdAt,
            "updatedAt": data[1][0].updatedAt
          }
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static async deletePhotoById(req, res) {
    let id = +req.params.id;
    Photo.destroy({
      where: {
        id,
      },
    })
      .then((data) => {
        res.status(200).json({
          "message": "Your photo has been successfully deleted",
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
}

module.exports = PhotoController;
