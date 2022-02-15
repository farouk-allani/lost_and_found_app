const Comment = require("../models/Comment");
const Demand = require("../models/Demand");
const Post = require("../models/Post");
const User = require("../models/User");

//create a post
exports.createPost = async (req, res, next) => {
  try {
    const newPost = new Post({
      ...req.body,
      creator: req.user,
    });

    if (req.file) {
      newPost.postImage = req.file.filename;
    } else {
      newPost.postImage = null;
    }
    await newPost.save();
    await User.updateOne({ posts: [...req.user.posts, newPost] });
    res.status(200).send({
      success: [{ msg: "Post created successfully!" }],
      post: newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      errors: [{ msg: "Post can't be created!" }],
    });
  }
};

//get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const findPosts = await Post.find();
    res.status(200).send({
      success: [{ msg: "All posts!" }],
      posts: findPosts,
    });
  } catch (error) {
    res.status(400).send({
      errors: [{ msg: "Can't get posts!" }],
    });
  }
};

//get post by title or content
exports.getPostByTitle = async (req, res) => {
  try {
    const title = req.params.title;
    const content = req.params.content;
    const location = req.params.location;
    let condition = title
      ? { title: { $regex: title, $options: "i" } }
      : content
      ? { content: { $regex: content, $options: "i" } }
      : { location: { $regex: location, $options: "i" } };
    const findOnePost = await Post.find(condition);
    res.status(200).send({
      success: [{ msg: "The post which you search !" }],
      posts: findOnePost,
    });
  } catch (error) {
    res.status(400).send({
      errors: [{ msg: "Can't get post by title or content!" }],
    });
  }
};

//change post status
exports.changeToResolved = async (req, res) => {
  try {
    if (req.body.isResolved == false) {
      isResolved = true;
    } else {
      isResolved = false;
    }
    const resolvedPost = await Post.updateOne(
      {
        _id: req.params.id,
      },
      { $set: { ...req.body, isResolved } }
    );
    res.status(200).send({
      success: [{ msg: "The post which you change it to resolved!" }],
      post: resolvedPost,
    });
  } catch (error) {
    res.status(400).send({
      errors: [{ msg: "Can't change to resolved!" }],
    });
  }
};

//get one post by id
exports.getOnePost = async (req, res) => {
  try {
    const findOnePost = await Post.findOne({
      _id: req.params.id,
    }).populate("creator");
    res.status(200).send({
      success: [{ msg: "The post which you search !" }],
      post: findOnePost,
    });
  } catch (error) {
    res.status(400).send({
      errors: [{ msg: "Can't get post!" }],
    });
  }
};

//delete one post
exports.deleteOnePost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    await Comment.deleteMany({ motherPost: post });
    await Demand.deleteMany({ about: post });
    await Post.findByIdAndDelete(req.params.id);
    // await User.updateOne({
    //   posts: [
    //     ...posts,
    //     (posts.filter = (item) => {
    //       item !== post;
    //     }),
    //   ],
    // });
    res.status(200).send({
      success: [{ msg: "Post was deleted successfully!" }],
    });
  } catch (error) {
    res.status(400).send({
      errors: [{ msg: "Can't delete it!" }],
    });
  }
};

//update one post
exports.editPost = async (req, res) => {
  try {
    let postImage;
    if (req.file) {
      postImage = req.file.filename;
    }
    const editPost = await Post.updateOne(
      {
        _id: req.params.id,
      },
      { $set: { ...req.body, postImage } }
    );
    res.status(200).send({
      success: [{ msg: "Post was updated successfully!" }],
      post: editPost,
    });
  } catch (error) {
    res.status(400).send({
      errors: [{ msg: "Can't update it!" }],
    });
  }
};
