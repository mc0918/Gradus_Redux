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

// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// if (process.env.NODE_ENV === "production") {
//   // Serve any static files
//   app.use(express.static(path.join(__dirname, "client/build")));
//   // Handle React routing, return all requests to React app
//   app.get("*", function(req, res) {
//     res.sendFile(path.join(__dirname, "client/build", "index.html"));
//   });
// }

var db;
// Connect to the database before starting the application server.
mongodb.MongoClient.connect(
  config.mongoURI,
  { useNewUrlParser: true },
  function(err, database) {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = database;
    console.log("Database connection ready");
    console.log(process.env.PORT);
    //API routes
    app.use("/userRoute", userRoute);

    //Start server
    app.listen(process.env.PORT || PORT, () => {
      console.log("Server is running on Port: ", process.env.PORT || PORT);
    });
  }
);

// // Need to change this for Heroku I think
// mongoose.connect(config.mongoURI || config.DB).then(
//   () => {
//     console.log("DB connected");
//     console.log(config.mongoURI);
//     console.log(process.env.PORT);
//   },
//   err => {
//     console.log("connection err: " + err);
//   }
// );

// // API routes
// app.use("/userRoute", userRoute);

// //Start server
// app.listen(process.env.PORT || PORT, () => {
//   console.log("Server is running on Port: ", process.env.PORT || PORT);
// });
