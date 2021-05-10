const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const port = process.env.PORT || 9600;

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage }).single("ipl");

app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.static("./public"));

app.get("/", (req, res) => {
  return res.render("form");
});

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) console.log(err);
    if (req.file) {
      console.log("req.file", req.file.filename);
      return res.render("form", { file: `uploads/${req.file.filename}` });
    } else {
      res.render("form");
    }
  });
});

app.listen(port, () => {
  console.log(`server is up and running on port ${port}`);
});
