const { Router } = require("express");
const {
  createBlog,
  createComment,
  renderBlogDetails,
  renderCreateBlogPage,
} = require("../controllers/blogController");
const upload = require("../config/upload");
const requireAuth = require("../middlewares/requireAuth");
const asyncHandler = require("../utils/asyncHandler");

const router = Router();

router.get("/add-new", requireAuth, renderCreateBlogPage);
router.get("/:id", asyncHandler(renderBlogDetails));
router.post("/comment/:blogId", requireAuth, asyncHandler(createComment));
router.post(
  "/",
  requireAuth,
  upload.single("coverImage"),
  asyncHandler(createBlog)
);

module.exports = router;
