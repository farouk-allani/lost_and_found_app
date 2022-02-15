const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const {
  createPost,
  getAllPosts,
  deleteOnePost,
  getOnePost,
  editPost,
  getPostByTitle,
  changeToResolved,
} = require("../controllers/post.controllers");
const upload = require("../middlewares/upload");

//create post
router.post("/add", isAuth, upload.single("postImage"), createPost);
//get all posts
router.get("/all", getAllPosts);
//get posts by title
router.get("/search/:title", getPostByTitle);
//get one post
router.put("/toresolved/:id", changeToResolved);
//get one post
router.get("/:id", isAuth, getOnePost);
//edit post
router.put("/edit/:id", isAuth, upload.single("postImage"), editPost);

//delete one post
router.delete("/:id", isAuth, deleteOnePost);

module.exports = router;
