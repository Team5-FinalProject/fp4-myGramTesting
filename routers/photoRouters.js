const router = require("express").Router();
const PhotoController = require("../controllers/photoController");
const authorization = require("../middlewares/authorization");

router.post("/", PhotoController.createPhoto);
router.get("/", PhotoController.getAllPhotos);
router.use("/:id", authorization);
router.put("/:id", PhotoController.updatePhotoById);
router.delete("/:id", PhotoController.deletePhotoById);

module.exports = router;
