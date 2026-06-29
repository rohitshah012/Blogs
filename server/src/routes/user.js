const { Router } = require("express");
const {
  logout,
  renderSigninPage,
  renderSignupPage,
  signin,
  signup,
} = require("../controllers/userController");
const asyncHandler = require("../utils/asyncHandler");

const router = Router();

router.get("/signin", renderSigninPage);
router.get("/signup", renderSignupPage);
router.post("/signin", asyncHandler(signin));
router.get("/logout", logout);
router.post("/signup", asyncHandler(signup));

module.exports = router;
