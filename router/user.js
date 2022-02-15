const express = require("express");
const router = express.Router();
const { SignUP, SignIn } = require("../controllers/user.controllers");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");
const {
  registerValidate,
  validation,
  loginValidate,
} = require("../middlewares/validateUser");

//resgister=sign up=create an account
router.post("/signUp", registerValidate(), validation, SignUP);

//login=sign in
router.post("/signIn", loginValidate(), validation, SignIn);
//authentification
router.get("/current", isAuth, (req, res) => {
  res.send({ user: req.user });
});

module.exports = router;
