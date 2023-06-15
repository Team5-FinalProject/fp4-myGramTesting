const { Comment, User, Photo } = require("../models");

class CommentController {
  static async createComment(req, res) {
    try {
      const { comment, PhotoId } = req.body;
      const user = res.locals.user;

      const newComment = await Comment.create({
        comment,
        UserId: user.id,
        PhotoId,
      });

      res.status(201).json({
        comment: {
          id: newComment.id,
          comment: newComment.comment,
          UserId: newComment.UserId,
          PhotoId: newComment.PhotoId,
          updatedAt: newComment.updatedAt,
          createdAt: newComment.createdAt,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  }

  static async getAllComments(req, res) {
    try {
      const comments = await Comment.findAll({
        where: {
          UserId: res.locals.user.id,
        },
        include: [
          {
            model: Photo,
            attributes: ["id", "title", "caption", "poster_image_url"],
          },
          {
            model: User,
            attributes: ["id", "username", "profile_image_url", "phone_number"],
          },
        ],
      });

      res.status(200).json({
        Comments: comments,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  static async updateCommentById(req, res) {
    try {
      const commentId = req.params.id;
      const { comment } = req.body;
      const authenticatedUser = res.locals.user;

      const updatedComment = await Comment.findOne({
        where: { id: commentId, UserId: authenticatedUser.id },
      });

      if (!updatedComment) {
        return res.status(404).json({
          devMessage: `Comment with id ${commentId} not found or user is not authorized`,
        });
      }

      updatedComment.comment = comment;

      await updatedComment.save();

      const photoId = updatedComment.PhotoId;

      res.status(200).json({
        comment: {
          id: updatedComment.id,
          comment: updatedComment.comment,
          UserId: updatedComment.UserId,
          PhotoId: photoId,
          updatedAt: updatedComment.updatedAt,
          createdAt: updatedComment.createdAt,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(401).json(err);
    }
  }

  static async deleteCommentById(req, res) {
    try {
      const commentId = req.params.id;
      const authenticatedUser = res.locals.user;

      const deletedComment = await Comment.findOne({
        where: { id: commentId, UserId: authenticatedUser.id },
      });

      if (!deletedComment) {
        return res.status(404).json({
          devMessage: `Comment with id ${commentId} not found or user is not authorized`,
        });
      }

      await Comment.destroy({
        where: { id: commentId },
      });

      return res.status(200).json({
        message: "Your comment has been successfully deleted",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
}

module.exports = CommentController;
