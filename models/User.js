// Schema.js
//Creates schema for adding new user, so far just email and password

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for User
const User = new Schema(
  {
    email: {
      type: String
    },
    password: {
      type: String
    }
  },
  {
    collection: "users"
  }
);

module.exports = mongoose.model("User", User);
