var express = require("express");
var router = express.Router();
const Model = require("../models/index");

// Read
router.get("/", async function (req, res, next) {
  // try {
    const tweets = await Model.Tweet.findAll({
      include: [Model.Comment, Model.Category, Model.Bookmark],
      order: [
            ['id', 'DESC'],
      ],
    });
    const categories = await Model.Category.findAll({});
    res.send({
      tweet: tweets,
      category: categories,
    });
  // } catch (err) {
  //   res.status(500).send(err);
  // }
});

//Create
router.post("/tweet", async (req, res, next) => {
  try {
    const tweets = await Model.Tweet.create({
      tweet: req.body.tweet,
      user_id: req.body.user_id,
      category_id: req.body.category_id,
    });
    const category = await Model.Category.findAll({
      where: {
        id: req.body.category_id
      }
    });
    res.send({
      tweets,
      category_name: category
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

/* こちらのアップデートは使用していないですがサンプルで置いています */
router.put("/tweet/:id", async function (req, res, next) {
  try {
    const result = await Model.Tweet.update({
      tweet: req.body.tweet
    }, {
      where: {
        id: req.params.id
      }
    });
    // res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});
//Delete
router.delete("/tweet/:id", async function (req, res, next) {
  // try {
    const result = await Model.Tweet.destroy({
      where: {
        id: req.params.id
      }
    });
    res.send({
      result: result
    });
  // } catch (err) {
  //   res.status(500).send(err);
  // }
});

module.exports = router;