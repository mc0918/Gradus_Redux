// server.js

const express = require("express");
const app = express();
const userRoute = require("./routes/userRoute");
const path = require("path");

//DB connectivity
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
const PORT = process.env.PORT || 4000;
//const PORT = 4000;
const cors = require("cors");
const config = require("./DB");

var db;
// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function(err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");
});

//Need to change this for Heroku I think
// mongoose.connect(config.DB).then(
//   () => {
//     console.log("DB connected");
//   },
//   err => {
//     console.log("connection err: " + err);
//   }
// );

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//API routes
app.use("/userRoute", userRoute);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

//Start server
app.listen(process.env.PORT || PORT, () => {
  console.log("Server is running on Port: ", PORT);
});
