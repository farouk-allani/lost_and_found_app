const mongoose = require("mongoose");
const { Schema } = mongoose;
const DemandSchema = new Schema(
  {
    to: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    about: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      // required: true,
    },
    content: {
      type: String,
      required: true,
      max: 2000,
    },
  },
  { timestamps: true }
);

module.exports = Demand = mongoose.model("Demand", DemandSchema);
