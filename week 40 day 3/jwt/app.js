const express = require("express");
const app = express();
const port = process.env.PORT || 3650;
const cors = require("cors");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const mongourl = "mongodb://localhost:27017";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let db;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { AccessToken } = require("./generateToken");
require("dotenv").config();

app.get("/", (req, res) => {
  return res.send("Server is running");
});

app.post("/register", (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.name) {
    return res.send({ error: "Provide email password and name" });
  } else {
    db.collection("users").findOne(
      { email: req.body.email },
      (err, collection) => {
        if (err) throw err;
        if (collection) {
          return res.send({ error: "Email already Taken" });
        } else {
          let hash = bcrypt.hashSync(req.body.password);
          db.collection("users").insertOne(
            { email: req.body.email, password: hash, name: req.body.name },
            (err, user) => {
              if (err) throw err;
              return res.send({ message: "User Registered" });
            }
          );
        }
      }
    );
  }
});

app.post("/login", (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.send({ auth: false, error: "Provide email and password" });
  } else {
    db.collection("users").findOne(
      { email: req.body.email },
      (err, collection) => {
        if (err) throw err;
        if (!collection) {
          return res.send({ auth: false, error: "Email not registered" });
        } else {
          const passIsValid = bcrypt.compareSync(
            req.body.password,
            collection.password
          );
          if (!passIsValid) {
            return res.send({ auth: false, error: "Incorrect Password" });
          } else {
            const Accesstoken = AccessToken(collection._id);
            return res.send({ auth: true, Accesstoken });
          }
        }
      }
    );
  }
});

app.get("/user", (req, res) => {
  let accesstoken = req.headers["x-access-token"];
  if (!accesstoken) return res.status(500).send("No token Provided");
  jwt.verify(accesstoken, process.env.ACCESS_SECRET, (err, data) => {
    if (err) return res.send("Token Expired OR Invalid");
    db.collection("users").findOne(
      { _id: mongodb.ObjectID(data.id) },
      { password: 0 },
      (err, result) => {
        if (err) throw err;
        return res.send(result);
      }
    );
  });
});

MongoClient.connect(mongourl, (err, connection) => {
  if (err) throw err;
  db = connection.db("jwttest");
  console.log("db connection established successfully");
});

app.listen(port, (err, live) => {
  if (err) throw err;
  console.log("listening on port " + port);
});
