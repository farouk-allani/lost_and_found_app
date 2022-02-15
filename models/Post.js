const mongoose = require("mongoose");
const URLSlugs = require("mongoose-url-slugs");
const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    postImage: {
      type: String,
      default: null,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      optianal: "",
    },
    isLost: {
      type: Boolean,
      default: true,
      required: true,
    },
    isResolved: {
      type: Boolean,
      default: false,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    demands: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Demand",
      },
    ],
  },
  {
    timestamps: true,
  }
);

PostSchema.plugin(URLSlugs("title", { field: "slug" }));
module.exports = Post = mongoose.model("Post", PostSchema);
