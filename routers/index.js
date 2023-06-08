const router = require("express").Router();
const userRouters = require("./userRouters");
const photoRouters = require("./photoRouters");
const commentRouters = require("./commentRouters");
const socialmediaRouters = require("./socialmediaRouters");
const authentication = require("../middlewares/authentication");

router.use("/users", userRouters);

router.use(authentication);

router.use("/photos", photoRouters);

router.use("/comments", commentRouters);

router.use("/socialMedias", socialmediaRouters);

router.use("/", (req, res) => {
  return res.status(404).json({
    code: 404,
    name: "Error",
    msg: "Not Found",
  });
});

module.exports = router;
