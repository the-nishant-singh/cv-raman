const express = require("express");
const app = express();
const mongodb = require("mongodb");
const jwt = require("jsonwebtoken");
const MongoClient = mongodb.MongoClient;
const mongourl = "mongodb://localhost:27017";
let db;
const port = process.env.PORT || 9600;
const bcryptjs = require("bcryptjs");
const cookieParser = require("cookie-parser");
const secret = "this is the most secret string on the planet";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "hbs");
app.set("views", "./views");

app.get("/", (req, res) => {
  if (req.cookies.cvramantoken) {
    console.log(req.cookies.cvramantoken);
    return res.redirect("/profile");
  }
  return res.render("form");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.collection("users").findOne({ email }, (err, collection) => {
    if (err || !collection) {
      return res.render("form", { err: "incorrect credentials" });
    }
    if (bcryptjs.compareSync(password, collection.password)) {
      let token = jwt.sign({ id: collection._id }, secret, { expiresIn: "1y" });
      res.cookie("cvramantoken", token, { maxAge: 90000000, httpOnly: true });
      return res.render("profile");
    } else {
      return res.render("form", { err: "incorrect credentials" });
    }
  });
});

app.get("/profile", (req, res) => {
  if (req.cookies.cvramantoken) {
    console.log(req.cookies.cvramantoken);
    jwt.verify(req.cookies.cvramantoken, secret, (err, decode) => {
      if (err) {
        throw err;
      }
      db.collection("users").findOne(
        { _id: mongodb.ObjectID(decode.id) },
        (err, result) => {
          if (err) {
            throw err;
          }
          console.log(result);
          return res.render("profile", { data: result });
        }
      );
    });
  } else {
    return res.redirect("/");
  }
});

app.post("/register", (req, res) => {
  const { email, password } = req.body;
  const hash = bcryptjs.hashSync(password);

  db.collection("users").insertOne({ email: email, password: hash });
  console.log(email, hash);
  res.redirect("/");
});

MongoClient.connect(
  mongourl,
  { useUnifiedTopology: true },
  (err, connection) => {
    if (err) throw err;
    db = connection.db("cvraman");
    console.log("db connection established");
  }
);

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`server is up and running on ${port}`);
});
