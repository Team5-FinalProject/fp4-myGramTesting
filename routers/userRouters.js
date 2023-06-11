const router = require("express").Router();
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.use(authentication);
router.put("/:id", UserController.updateUserById);
router.delete("/:id", UserController.deleteUser);

module.exports = router;
