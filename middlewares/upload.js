const multer = require("multer");
const path = require("path");

//upload photo
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./client/public/uploads/");
  },
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname);
    callback(null, Date.now() + extension);
  },
});
let upload = multer({
  storage: storage,
});

module.exports = upload;
