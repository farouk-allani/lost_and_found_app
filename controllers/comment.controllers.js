const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");

//create a Comment
exports.createComment = async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.idPost });
    const newComment = new Comment({
      ...req.body,
      creator: req.user,
      motherPost: req.params.idPost,
    });
    await newComment.save();
    await User.updateOne({ comments: [...req.user.comments, newComment] });
    await Post.updateOne({
      comments: [...post.comments, newComment],
    });
    res.status(200).send({
      success: [{ msg: "Comment created successfully!" }],
      comment: newComment,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      errors: [{ msg: "Comment can't be created!" }],
    });
  }
};

//get all Comments
exports.getAllComments = async (req, res) => {
  try {
    const findComments = await Comment.find({
      motherPost: req.params.idPost,
    }).populate("creator");
    res.status(200).send({
      success: [{ msg: "All Comments!" }],
      comments: findComments,
    });
  } catch (error) {
    res.status(400).send({
      errors: [{ msg: "Can't get Comments!" }],
    });
  }
};

//get one Comment by title
exports.getOneComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.idPost);

    if (!post) {
      return res.status(400).send({ errors: [{ msg: "Post not found!" }] });
    }
    const findOneComment = await Comment.findById(req.params.idComment);
    res.status(200).send({
      success: [{ msg: "The Comment which you search !" }],
      comment: findOneComment,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      errors: [{ msg: "Can't get Comment!" }],
    });
  }
};

//delete one Comment
exports.deleteOneComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete({ _id: req.params.idComment });
    res.status(200).send({
      success: [{ msg: "Comment was deleted!" }],
    });
  } catch (error) {
    res.status(400).send({
      errors: [{ msg: "Can't delete it!" }],
    });
  }
};

//update one Comment
exports.editComment = async (req, res) => {
  try {
    const editComment = await Comment.updateOne(
      {
        _id: req.params.idComment,
      },
      {
        $set: req.body,
      }
    );
    res.status(200).send({
      success: [{ msg: "Comment was updated successuflly!" }],
      comment: editComment,
    });
  } catch (error) {
    res.status(400).send({
      errors: [{ msg: "Can't update it!" }],
    });
  }
};
