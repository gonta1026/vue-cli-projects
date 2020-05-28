var express = require("express");
var router = express.Router();
const Model = require("../models/index");

//Create
router.post("/", async (req, res) => {
  try {
    const user = await Model.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.send({
      user
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;