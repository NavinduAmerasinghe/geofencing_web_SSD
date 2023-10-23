const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "/images");
    },
  }),
  limits: {
    fileSize: 8000000 // 8MB
  }
});

module.exports = upload;
