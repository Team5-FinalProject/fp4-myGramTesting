const { Photo } = require('../models');

function authorization(req, res, next) {
    const photoId = req.params.id;
    const authenticatedUser = res.locals.user;

    Photo.findOne({
        where: {
            id: photoId
        }
    })
        .then(photo => {
            if (!photo) {
                return res.status(404).json({
                    name: "Not Found",
                    devMassage: `Photo with id ${photoId} not found in database`
                })
            }
            if (photo.UserId === authenticatedUser.id) {
                return next()
            } else {
                return res.status(403).json({
                    name: "Forbidden",
                    devMassage: `User with id ${authenticatedUser.id} not authorized to access this photo`
                })
            }
        })
        .catch(err => {
            return res.status(500).json({
                name: "Internal Server Error",
                devMassage: err
            })
        })
}

module.exports = authorization