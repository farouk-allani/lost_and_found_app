const User = require("../models/User");

const isAdmin = async (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      next();
    }
  } catch (error) {
    res.status(401).send({ errors: [{ msg: "you are not admin!" }] });
  }
};

module.exports = isAdmin;
