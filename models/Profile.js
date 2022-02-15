const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProfileSchema = Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  bio: {
    type: String,
    default: "I am searcher",
  },
  profilePic: {
    type: String,
    default: null,
  },
  date_of_birth: { type: Date },
  address: { type: String, default: "Tunis,Tunisia" },
  phone: { type: Number, required: true, default: null },
});

module.exports = Profile = mongoose.model("Profile", ProfileSchema);
