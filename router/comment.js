const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const {
  createComment,
  getAllComments,
  deleteOneComment,
  getOneComment,
  editComment,
} = require("../controllers/comment.controllers");

//create comment
router.post("/:idPost", isAuth, createComment);

//get all Comments
router.get("/of/:idPost", isAuth, getAllComments);

//get one comment
router.get("/:idPost/:idComment", isAuth, getOneComment);

//delete one Comment
router.delete("/:idComment", isAuth, deleteOneComment);
//edit Comment
router.put("/edit/:idComment", isAuth, editComment);

module.exports = router;
