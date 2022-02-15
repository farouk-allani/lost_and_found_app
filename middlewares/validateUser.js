const { check, validationResult } = require("express-validator");

exports.registerValidate = () => [
  check("username", "Username is required").notEmpty().trim(),
  check("email", "Email is required").notEmpty().trim(),
  check("email", "It should be an email").isEmail(),
  check("password", "Password is required").notEmpty(),
  check(
    "password",
    "Enter a valid password that contains au minimun six characters"
  ).isLength({ min: 6 }),
  // check(
  //   "password",
  //   "Password must include one lowercase character, one uppercase character, a number, and a special character."
  // ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
];
exports.loginValidate = () => [
  check("email", "Email is required!").notEmpty(),
  check("email", "It should be an email").isEmail(),
  check("password", "Password is required!").notEmpty(),
  check(
    "password",
    "Enter a valid password that contains au minimun six characters"
  ).isLength({ min: 6 }),
];

exports.validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
