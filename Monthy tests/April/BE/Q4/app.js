const express = require("express");
const app = express();
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const mongourl = "mongodb://localhost:27017";
const port = process.env.PORT || 6701;
let db;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//addDirector
app.post("/addDirector", (req, res) => {
  const { name } = req.body;
  if (name) {
    db.collection("director").insertOne({ name }, (err, result) => {
      if (err) throw err;
      return res.send({ message: "Director entry done" });
    });
  } else {
    return res.send({ error: "No name provided" });
  }
});

//get director
app.get("/director", (req, res) => {
  db.collection("director")
    .find({})
    .toArray((err, collection) => {
      if (err) throw err;
      return res.send(collection);
    });
});

//get director by id
app.get("/director/:id", (req, res) => {
  db.collection("director").find({ _id: req.params.id }, (err, director) => {
    if (err) throw err;
    return res.send(director);
  });
});

//update director
app.put("/updateDirector/:id", (req, res) => {
  const { name } = req.body;
  if (id) {
    db.collection("director").updateOne(
      { _id: mongodb.ObjectID(id) },
      {
        $set: {
          name,
        },
      },
      (err, result) => {
        if (err) throw err;
        return res.send({ message: "updated" });
      }
    );
  } else {
    return res.send({ error: "No name provided" });
  }
});

//delete movie
app.get("/deleteDirector/:id", (req, res) => {
  db.collection("director").remove({ _id: req.params.id }, (err, result) => {
    if (err) throw err;
    return res.send({ message: "director deleted" });
  });
});

//add movies
app.post("/addMovies", (req, res) => {
  const { title, director, rating, year } = req.body;
  if ((title, director, rating, year)) {
    db.collection("movies").insertOne(
      { title, director: mongodb.ObjectID(director), rating, year },
      (err, result) => {
        if (err) throw err;
        return res.send({ message: "Movie entry done" });
      }
    );
  } else {
    return res.send({ error: "Provide title, director, rating, year" });
  }
});

//get all movies
app.get("/movies", (req, res) => {
  db.collection("movies")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      return res.send(result);
    });
});

//get movies by id
app.get("/movies/:id", (req, res) => {
  db.collection("movies").findOne(
    { _id: mongodb.ObjectID(req.params.id) },
    (err, movie) => {
      if (err) throw err;
      db.collection("movies")
        .aggregate([
          {
            $lookup: {
              from: "director",
              localField: "director",
              foreignField: "_id",
              as: "director_det",
            },
          },
        ])
        .toArray((err, collections) => {
          if (err) throw err;
          return res.send(collections);
        });
    }
  );
});

//delete movie
app.get("/deleteMovie/:id", (req, res) => {
  db.collection("movies").remove({ _id: req.params.id }, (err, result) => {
    if (err) throw err;
    return res.send({ message: "movie deleted" });
  });
});

MongoClient.connect(
  mongourl,
  { useUnifiedTopology: true },
  (err, connection) => {
    if (err) {
      throw err;
    }
    db = connection.db("cvraman");
    console.log("db connection established");
  }
);

app.listen(port, (err) => {
  console.log(`server id up and running on port ${port}`);
});
