const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");
const {
  getOneProfile,
  createProfile,
  editProfile,
  getOtherProfile,
  getAllProfiles,
  deleteProfile,
  getProfileByName,
} = require("../controllers/profile.controllers");
const upload = require("../middlewares/upload");
//create only one profile with that email
router.post("/", isAuth, createProfile);
//get one profile
router.get("/myprofile", isAuth, getOneProfile);
//get all profiles
router.get("/all", isAuth, isAdmin, getAllProfiles);
//delete profiles
router.delete("/delete/all", isAuth, isAdmin, deleteProfile);
//search profile with username
router.get("/search/:name", isAuth, isAdmin, getProfileByName);
//delete one profile
router.delete("/:id", isAuth, isAdmin, deleteProfile);
//get one profile by id
router.get("/:id", isAuth, getOtherProfile);
//update profile
router.put("/edit/:id", isAuth, upload.single("profilePic"), editProfile);

module.exports = router;
