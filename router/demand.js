const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const {
  createDemand,
  getAllDemands,
  deleteOneDemand,
  getOneDemand,
  editDemand,
} = require("../controllers/demand.controllers");

//create a demand
router.post("/about/:idPost", isAuth, createDemand);

//get all Demands
router.get("/about/:idPost", isAuth, getAllDemands);

//get one Demand
router.get("/:idDemand", isAuth, getOneDemand);

//delete one Demand
router.delete("/:idDemand", isAuth, deleteOneDemand);

//edit Demand
router.put("/edit/:idDemand", isAuth, editDemand);

module.exports = router;
