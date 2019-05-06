// userRoute.js

const express = require("express");
const app = express();
const userRouter = express.Router();

const User = require("../models/User");

//"/add changed to /"
userRouter.route("/add").post(function(req, res) {
  const user = new User(req.body);
  user
    .save()
    .then(user => {
      res.json("user added successfully");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

userRouter.route("/").get(function(req, res) {
  User.find(function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

module.exports = userRouter;
