// server.js

const express = require("express");
const app = express();
const userRoute = require("./routes/userRoute");
const path = require("path");
//DB connectivity
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 4000;
//const PORT = 4000;
const cors = require("cors");
const config = require("./DB");

//Need to change this for Heroku I think
mongoose.connect(config.DB).then(
  () => {
    console.log("DB connected");
  },
  err => {
    console.log("connection err: " + err);
  }
);

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
app.listen(PORT, () => {
  console.log("Server is running on Port: ", PORT);
});
