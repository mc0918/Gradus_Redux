var express = require("express");
var app = express();
const routes = require("./serverRoutes");

// console.log(routes);

require("dotenv").config();

//=====DB/login dependencies
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
//const config = require("./db");
const users = require("./serverRoutes/user");

const PORT = process.env.PORT || 5000;
var databaseURI = "mongodb://localhost/Gradus";
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
} else {
  mongoose.connect(databaseURI, { useNewUrlParser: true });
}
var db = mongoose.connection;
db.on("error", err => console.log("mongoose error :", err));
// db.once("open", () => console.log("mongoose connection successful"));

//======================================================================================TEST=======================
db.once("open", function callback() {
  // Create song schema
  let songSchema = mongoose.Schema({
    decade: String,
    artist: String,
    song: String,
    weeksAtOne: Number
  });

  // Store song documents in a collection called "songs"
  let Song = mongoose.model("songs", songSchema);

  // Create seed data
  let seventies = new Song({
    decade: "1970s",
    artist: "Debby Boone",
    song: "You Light Up My Life",
    weeksAtOne: 10
  });

  let eighties = new Song({
    decade: "1980s",
    artist: "Olivia Newton-John",
    song: "Physical",
    weeksAtOne: 10
  });

  let nineties = new Song({
    decade: "1990s",
    artist: "Mariah Carey",
    song: "One Sweet Day",
    weeksAtOne: 16
  });

  /*
   * First we'll add a few songs. Nothing is required to create the
   * songs collection; it is created automatically when we insert.
   */

  // let list = [seventies, eighties, nineties];

  // Song.insertMany(list)
  //   .then(() => {
  //     /*
  //      * Then we need to give Boyz II Men credit for their contribution
  //      * to the hit "One Sweet Day".
  //      */

  //     return Song.update(
  //       { song: "One Sweet Day" },
  //       { $set: { artist: "Mariah Carey ft. Boyz II Men" } }
  //     );
  //   })
  //   .then(() => {
  /*
   * Finally we run a query which returns all the hits that spend 10 or
   * more weeks at number 1.
   */

  //   return Song.find({ weeksAtOne: { $gte: 10 } }).sort({ decade: 1 });
  // })
  // .then(docs => {
  //   docs.forEach(doc => {
  //     console.log(
  //       "In the " +
  //         doc["decade"] +
  //         ", " +
  //         doc["song"] +
  //         " by " +
  //         doc["artist"] +
  //         " topped the charts for " +
  //         doc["weeksAtOne"] +
  //         " straight weeks."
  //     );
  //   });
  // })
  // .then(() => {
  //   // Only close the connection when your app is terminating
  //   return mongoose.connection.close();
  // })
  //     .catch(err => {
  //       // Log any errors that are thrown in the Promise chain
  //       console.log(err);
  //     });
  // });

  //======================================================================================TEST=======================

  app.use(passport.initialize());
  require("./passport")(passport);

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  //=====DB/login dependencies
  if (process.env.NODE_ENV === "production") {
    // Exprees will serve up production assets
    app.use(express.static("client/build"));
    // Express serve up index.html file if it doesn't recognize route
    const path = require("path");
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }

  app.use(function(req, res, next) {
    // Website you wish to allow to
    //either localhost:3000 or heroku deployed link (https://guarded-sands-13025.herokuapp.com)
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
  });

  app.use("/", routes);
  app.use("/api/users", users);
  // console.log(app._router.stack);

  //NEW STUFF HERE
  const cantus = require("./serverRoutes/api/database");
  const dbModel = require("./serverModels/CantusFirmus");
  app.get("/cantus", (req, res) => {
    console.log("route hit!");

    dbModel.find({}).then(data => {
      // res.json(data)
      //   res.json("clam");
      console.log("data: ", data);
      res.json(data);
    });
    // res.json("sent!");
  });
  app.post("/api/cantus", (req, res) => {
    console.log(req.body);
    // Song.find({}).toArray(function(err, docs) {
    //   res.send(docs);
    //   console.log("DOOOOOOOOCCCCSSSS!!!", docs);
    // });
    res.send("routes match?");
  });

  // var databaseURI = "mongodb://localhost/Gradus";
  // if (process.env.MONGODB_URI) {
  //   mongoose.connect(process.env.MONGODB_URI);
  // } else {
  //   mongoose.connect(databaseURI);
  // }
  // var db = mongoose.connection;
  // db.on("error", err => console.log("mongoose error :", err));
  // db.once("open", () => console.log("mongoose connection successful"));
});
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
