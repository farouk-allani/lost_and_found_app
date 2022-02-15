const User = require("../models/User");
const jwt = require("jsonwebtoken");
const isAuth = async (req, res, next) => {
  try {
    //    import token
    // headers=> authorization
    const token = req.headers["authorization"];
    // console.log(token);
    //   si mathamch token
    if (!token) {
      return res
        .status(401)
        .send({ errors: [{ msg: "you are not authorized" }] });
    }
    // you are not authorized
    // we should verify if the token is valid
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // test if the user exists with that id
    const user = await User.findOne({ _id: decoded.id }).select("-password");
    // you are not authorised
    if (!user) {
      return res
        .status(401)
        .send({ errors: [{ msg: "you are not authorized" }] });
    }

    // if not
    // req to add user
    req.user = user;
    // next
    next();
  } catch (error) {
    res.status(401).send({ errors: [{ msg: "you are not authorized" }] });
  }
};

module.exports = isAuth;
