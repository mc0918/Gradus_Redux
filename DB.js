// DB.js
//This file creates the reference to the database
//To deploy on heroku both a local and MLAB database need to be exported

module.exports = {
  // axios is the name of the local database
  DB: "mongodb://localhost:27017/axios",

  //mongodb is not used in the react app but run in the command line to set a config variable
  //that we can access in node.js as process.env.MONGO
  //gradus and gradus123 are database login (user, pass respectively)
  //take this variable out of final build
  mongodb: "gradus:gradus123@ds151626.mlab.com:51626/heroku_9z5q0j31"
};
