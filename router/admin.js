const express = require("express");
const { SignIn } = require("../controllers/user.controllers");
const { loginValidate, validation } = require("../middlewares/validateUser");
const isAdmin = require("../middlewares/isAdmin");
const isAuth = require("../middlewares/isAuth");
const { getPostsData } = require("../controllers/admin.controllers");

const router = express.Router();
//login=sign in
router.post("/signIn", loginValidate(), validation, SignIn);
router.get("/posts/resolved", isAuth, isAdmin, getPostsData);

module.exports = router;
