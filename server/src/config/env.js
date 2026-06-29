const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });

const isProduction = process.env.NODE_ENV === "production";
const jwtSecret = process.env.JWT_SECRET || "change-this-local-development-secret";

if (isProduction && !process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is required when NODE_ENV=production");
}

if (!process.env.MONGO_URL) {
  throw new Error("MONGO_URL is required");
}

module.exports = {
  appName: process.env.APP_NAME || "Blogify",
  cookieName: process.env.AUTH_COOKIE_NAME || "token",
  isProduction,
  jwtSecret,
  mongoUrl: process.env.MONGO_URL,
  port: Number(process.env.PORT) || 8000,
  paths: {
    public: path.resolve(process.cwd(), "public"),
    uploads: path.resolve(process.cwd(), "public", "uploads"),
    views: path.resolve(process.cwd(), "views"),
  },
};
