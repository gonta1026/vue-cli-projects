var express = require("express");
var router = express.Router();
const Model = require("../models/index");

// Read
router.get("/", async function (req, res) {
  // try {
  const bookmarks = await Model.Bookmark.findAll({});
  res.send({
    bookmarks,
  });
  // } catch (err) {
  //   res.status(500).send(err);
  // }
});

router.post("/", async (req, res) => {
  // try {
    const bookmark = await Model.Bookmark.findOrCreate({ //bookmarkされていなかったらする
      where: {
        tweet_id: req.body.tweet_id, 
        user_id: req.body.user_id
      },
      defaults: {
        tweet_id: req.body.tweet_id,
        user_id: req.body.user_id
      }
    })
    if (bookmark[1]){  //bookmarkを作成
      res.send({
        bookmark: {
          tweet_id: req.body.tweet_id,
          user_id: req.body.user_id
        }
      });
    } else {  //bookmarkされていたら消去
      const result = await Model.Bookmark.destroy({
        where: {
          tweet_id: req.body.tweet_id,
          user_id: req.body.user_id
        }
      });
      res.send(""); 
    }
  // }catch(err){
  //   res.status(500).send(err);
  // }
});

// router.delete("/bookmark/:id", async function (req, res, next) {
//   // try {
//   const result = await Model.Bookmark.destroy({
//     where: {
//         tweet_id: req.params.id,
//         user_id: req.body.user_id
//       }
//     });
//     res.send(""); 
//   // } catch (err) {
//   //   res.status(500).send(err);
//   // }
// });

module.exports = router;