const User = require("../models/User");
const Post = require("../models/Post");
const Demand = require("../models/Demand");

//create a Demand
exports.createDemand = async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.idPost });
    if (!post) {
      return res.status(400).send({ errors: [{ msg: "Post not found" }] });
    }

    const newDemand = new Demand({
      ...req.body,
      from: req.user._id,
      to: post.creator,
      about: req.params.idPost,
    });

    await newDemand.save();
    await User.updateOne({ demands: [...req.user.demands, newDemand] });
    await Post.updateOne({ demands: [...post.demands, newDemand] });
    res.status(200).send({
      success: [{ msg: "Demand created successfully!" }],
      Demand: newDemand,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      errors: [{ msg: "Demand can't be created!" }],
    });
  }
};

//get all Demands
exports.getAllDemands = async (req, res) => {
  try {
    const findDemands = await Demand.find();
    res.status(200).send({
      success: [{ msg: "All Demands!" }],
      Demands: findDemands,
    });
  } catch (error) {
    res.status(400).send({
      errors: [{ msg: "Can't get Demands!" }],
    });
  }
};

//get one Demand by Id
exports.getOneDemand = async (req, res) => {
  try {
    const findOneDemand = await Demand.findOne({ _id: req.params.id });
    console.log(findOneDemand);
    res.status(200).send({
      success: [{ msg: "The Demand which you search !" }],
      Demand: findOneDemand,
    });
  } catch (error) {
    res.status(400).send({
      errors: [{ msg: "Can't get Demand!" }],
    });
  }
};

//delete one Demand
exports.deleteOneDemand = async (req, res) => {
  try {
    await Demand.findByIdAndDelete(req.params.idDemand);
    res.status(200).send({
      success: [{ msg: "Demand was deleted!" }],
    });
  } catch (error) {
    res.status(400).send({
      errors: [{ msg: "Can't delete it!" }],
    });
  }
};

//update one Demand
exports.editDemand = async (req, res) => {
  try {
    const editDemand = await Demand.updateOne(
      {
        _id: req.params.idDemand,
      },
      { $set: req.body }
    );
    res.status(200).send({
      success: [{ msg: "Demand was updated successuflly!" }],
      Demand: editDemand,
    });
  } catch (error) {
    res.status(400).send({
      errors: [{ msg: "Can't update it!" }],
    });
  }
};
