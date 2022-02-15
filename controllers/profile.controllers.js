const Profile = require("../models/Profile");
const User = require("../models/User");
const Post = require("../models/Post");
const Demand = require("../models/Demand");
const Comment = require("../models/Comment");

//create a profile
exports.createProfile = async (req, res) => {
  try {
    //verify that user doesn't have a profile
    const findOwner = await Profile.findOne({ owner: req.user._id });
    if (findOwner) {
      return res.status(400).send({
        errors: [{ msg: "You already have a profile! " }],
      });
    }

    //then create a new profile
    const newProfile = new Profile({ ...req.body, owner: req.user._id });
    await newProfile.save();
    await User.updateOne({ profile: newProfile });
    return res.status(200).send({
      success: [{ msg: "profile created successfully!" }],
      profile: newProfile,
    });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "Can't creat profile!" }] });
  }
};

//get all profiles (admin route)
exports.getAllProfiles = async (req, res) => {
  try {
    const findProfile = await Profile.findOne({
      owner: req.user._id,
    });
    const allProfiles = await Profile.find({
      _id: { $ne: findProfile._id },
    }).populate("owner");
    res.status(200).send({
      success: [{ msg: "All profiles!" }],
      profiles: allProfiles,
    });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "can't get profiles" }] });
  }
};

//find a profile
exports.getOneProfile = async (req, res) => {
  try {
    const findProfile = await Profile.findOne({ owner: req.user._id }).populate(
      "owner"
    );
    res.status(200).send({
      success: [{ msg: `Profile of ${req.user.username}!` }],
      profile: findProfile,
    });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "can't get the profile" }] });
  }
};

//find a profile by id
exports.getOtherProfile = async (req, res) => {
  try {
    const findProfile = await Profile.findOne({
      owner: req.params.id,
    }).populate("owner");
    res.status(200).send({
      success: [{ msg: `Profile of ${findProfile.owner.username}!` }],
      profile: findProfile,
    });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "can't get the profile by Id" }] });
  }
};

//get profile by name (admin route)
exports.getProfileByName = async (req, res) => {
  try {
    const findByName = await Profile.find({
      owner: req.user.username,
    }).populate("owner");

    res.status(200).send({
      success: [{ msg: "profile found  with success!" }],
      profile: findByName,
    });
    console.log(findByName);
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "can't get the profile" }] });
  }
};

//delete profile
exports.deleteProfile = async (req, res) => {
  try {
    // id profile
    const profile = await Profile.findOne({ _id: req.params.id });
    await Comment.deleteMany({ creator: profile.owner });
    await Demand.deleteMany({ from: profile.owner });
    await Post.deleteMany({ creator: profile.owner });
    await Profile.findOneAndDelete({ _id: req.params.id });
    await User.findOneAndDelete({ _id: profile.owner });
    await res.status(200).send({
      success: [{ msg: "profile was deleted!" }],
    });
  } catch (error) {
    res
      .status(400)
      .send({ errors: [{ msg: "can't delete the current profile" }] });
  }
};

//edit profile
exports.editProfile = async (req, res) => {
  try {
    let profilePic;
    if (req.file) {
      profilePic = req.file.filename;
    }
    const updatedProfile = await Profile.updateOne(
      {
        owner: req.user._id,
      },
      {
        $set: { ...req.body, profilePic },
      }
    );
    await User.updateOne(
      {
        _id: req.user._id,
      },
      {
        $set: { ...req.body },
      }
    );

    if (updatedProfile.modifiedCount) {
      return res.status(200).send({
        success: [{ msg: "profile updated successfully!" }],
      });
    } else {
      return res.status(200).send({
        success: [{ msg: "There is no modification" }],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "can't update your  profile" }] });
  }
};
