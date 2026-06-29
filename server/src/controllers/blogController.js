const Blog = require("../models/blog");
const Comment = require("../models/comment");

function renderCreateBlogPage(req, res) {
  return res.render("addBlog");
}

async function renderBlogDetails(req, res, next) {
  const blog = await Blog.findById(req.params.id).populate("createdBy");

  if (!blog) {
    return next();
  }

  const comments = await Comment.find({ blogId: req.params.id })
    .populate("createdBy")
    .sort({ createdAt: -1 });

  return res.render("blog", {
    blog,
    comments,
  });
}

async function createComment(req, res) {
  const content = req.body.content ? req.body.content.trim() : "";

  if (!content) {
    return res.redirect(`/blog/${req.params.blogId}`);
  }

  await Comment.create({
    content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });

  return res.redirect(`/blog/${req.params.blogId}`);
}

async function createBlog(req, res) {
  const { title, body } = req.body;
  const coverImageURL = req.file ? `/uploads/${req.file.filename}` : undefined;

  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverImageURL,
  });

  return res.redirect(`/blog/${blog._id}`);
}

module.exports = {
  createBlog,
  createComment,
  renderBlogDetails,
  renderCreateBlogPage,
};
