const cookieParser = require("cookie-parser");
const express = require("express");

const env = require("./config/env");
const { getHomePage } = require("./controllers/homeController");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const {
  errorHandler,
  notFoundHandler,
} = require("./middlewares/errorHandler");
const blogRoute = require("./routes/blog");
const userRoute = require("./routes/user");
const asyncHandler = require("./utils/asyncHandler");

const app = express();

app.set("view engine", "ejs");
app.set("views", env.paths.views);

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie(env.cookieName));
app.use((req, res, next) => {
  res.locals.appName = env.appName;
  res.locals.user = req.user || null;
  next();
});
app.use(express.static(env.paths.public));

app.get("/", asyncHandler(getHomePage));
app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
