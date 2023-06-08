const router = require("express").Router();
const CommentController = require("../controllers/commentController");

router.post("/", CommentController.createComment);
router.get("/", CommentController.getAllComments);
router.put("/:id", CommentController.updateCommentById);
router.delete("/:id", CommentController.deleteCommentById);

module.exports = router;
