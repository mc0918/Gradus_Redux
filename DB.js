// DB.js
//This file creates the reference to the database
//To deploy on heroku both a local and MLAB database need to be exported

module.exports = {
  // the /axios is the name of the database
  //DB: process.env.MONGO
  DB: "mongodb://localhost:27017/axios"
};
