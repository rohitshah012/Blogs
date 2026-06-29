const env = require("../config/env");
const User = require("../models/user");

const authCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: env.isProduction,
};

function renderSigninPage(req, res) {
  return res.render("signin");
}

function renderSignupPage(req, res) {
  return res.render("signup");
}

async function signin(req, res) {
  const { email, password } = req.body;

  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie(env.cookieName, token, authCookieOptions).redirect("/");
  } catch (error) {
    return res.status(401).render("signin", {
      error: "Incorrect email or password",
    });
  }
}

function logout(req, res) {
  return res.clearCookie(env.cookieName, authCookieOptions).redirect("/");
}

async function signup(req, res) {
  const { fullName, email, password } = req.body;

  try {
    await User.create({
      fullName,
      email,
      password,
    });

    return res.redirect("/user/signin");
  } catch (error) {
    const message =
      error.code === 11000
        ? "An account with this email already exists"
        : "Unable to create account";

    return res.status(400).render("signup", {
      error: message,
    });
  }
}

module.exports = {
  logout,
  renderSigninPage,
  renderSignupPage,
  signin,
  signup,
};
