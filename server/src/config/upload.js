const fs = require("fs");
const multer = require("multer");
const path = require("path");
const env = require("./env");

fs.mkdirSync(env.paths.uploads, { recursive: true });

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, env.paths.uploads);
  },
  filename(req, file, cb) {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "-");
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const allowedImageTypes = new Set([
  "image/avif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    if (!allowedImageTypes.has(file.mimetype)) {
      return cb(new Error("Only AVIF, JPEG, PNG, and WEBP images are allowed"));
    }

    return cb(null, true);
  },
});

module.exports = upload;
