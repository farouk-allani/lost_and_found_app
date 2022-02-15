const Post = require("../models/Post");

//get data from posts
exports.getPostsData = async (req, res) => {
  try {
    const datafromPosts = await Post.find();
    const dataAll = datafromPosts.map((post) => post.isResolved);
    const dataResolved = dataAll.filter((post) => post === true);
    const dataNotResolved = dataAll.filter((post) => post === false);
    const posts = dataAll.length;
    const resolvedPosts = dataResolved.length;
    const notResolvedPosts = dataNotResolved.length;
    const data = { resolvedPosts, notResolvedPosts };
    res.status(200).send({
      success: [
        {
          msg: "Data which you search",
        },
      ],
      dataChart: data,
    });
  } catch (error) {
    res.status(400).send({
      errors: [{ msg: "Can't get data!" }],
    });
  }
};
