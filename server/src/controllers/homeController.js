const Blog = require("../models/blog");

async function getHomePage(req, res) {
  const blogs = await Blog.find({}).sort({ createdAt: -1 });

  return res.render("home", {
    blogs,
  });
}

module.exports = {
  getHomePage,
};
