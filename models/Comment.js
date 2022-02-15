const mongoose = require("mongoose");
const URLSlugs = require("mongoose-url-slugs");
const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
      slug: "title",
    },
    motherPost: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
CommentSchema.plugin(URLSlugs("content", { field: "slug" }));
module.exports = Comment = mongoose.model("Comment", CommentSchema);
