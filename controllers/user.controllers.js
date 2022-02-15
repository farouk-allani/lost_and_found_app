const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
//create an account
exports.SignUP = async (req, res) => {
  try {
    const { email, password } = req.body;
    //1st step:verify if the email is existed
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(400).send({
        errors: [
          { msg: "Try with another email address, it's already used! " },
        ],
      });
    }
    // new user
    const newUser = new User({ ...req.body });
    //hash password
    const hashedPassword = await bcrypt.hashSync(password, saltRounds);
    newUser.password = hashedPassword;
    //save user to db
    //creat to token==key
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "3 days" }
    );
    await newUser.save();
    res.status(200).send({
      success: [{ msg: "Account created successfully!" }],
      user: newUser,
      token,
    });
  } catch (error) {
    res.status(400).send({
      errors: [{ msg: "Account can't be created!" }],
    });
  }
};

//login
exports.SignIn = async (req, res) => {
  try {
    // email & password
    const { email, password } = req.body;
    //   test if email exists
    const findUser = await User.findOne({ email });
    // if it isn't exited
    // bad credential
    if (!findUser) {
      return res.status(400).send({ errors: [{ msg: "bad credential" }] });
    }
    // test password
    //   password in BD== password
    const comparePass = await bcrypt.compare(password, findUser.password);
    //   they r not equal
    // bad crential
    if (!comparePass) {
      return res.status(400).send({ errors: [{ msg: "bad credential" }] });
    }
    //creat to token==key
    const token = jwt.sign(
      {
        id: findUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "3 days" }
    );
    res.status(200).send({
      success: [{ msg: "Login successfully" }],
      user: findUser,
      token,
    });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "login failed" }] });
  }
};
