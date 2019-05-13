// const mongoose = require('mongoose')
let databaseController = require("../../serverController/methods_DB");
const router = require("express").Router();
// mongoose.connect("mongodb://localhost/Gradus", { useNewUrlParser: true });

//Changed "/" to "/cantus"
router.route("/cantus").get(databaseController.findAll);
// router.get("/", )

module.exports = router;
