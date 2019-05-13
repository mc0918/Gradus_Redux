// const mongoose = require('mongoose')
let databaseController = require("../../serverController/methods_DB");
const router = require("express").Router();
// mongoose.connect("mongodb://localhost/Gradus", { useNewUrlParser: true });

//Changed "/" to "/cantus"
//Changed.route to .get
router.get("/cantus").get(databaseController.findAll, (req, res) => {
  return res.json(res);
});
// router.get("/", )

module.exports = router;
