var express = require("express");
var router = express.Router();

const Message = require("../models/message");
const User = require("../models/users");

const { titleToSlug } = require("../modules/slugGenerator");

router.post("/newmessage", (req, res) => {
  User.findOne({ token: req.body.token }).then((user) => {
    const newMessage = new Message({
      title: req.body.title,
      slug: titleToSlug(req.body.title),
      date_publish: new Date(),
      // add the date_publish (now)
      text: req.body.text,
      author: user.id,
      answers: [],
    });

    newMessage.save().then((data) => {
      console.log(data);
      res.json({ result: true });
    });
  });
});

router.get("/allmessages", function (req, res) {
  Message.find()
    .populate("author")
    .then((data) => {
      res.json({ result: true, message: data });
    });
});


router.get('/getmessage/:slug', (req, res) => {
  Message.findOne({ slug: req.params.slug })
  .populate("author")
  .populate(
    {
      path : 'answers',
      populate : {
        path : 'author'
      }
    })
  .then((data) => {
      res.json({ result: true, forum: data })
  })

})


module.exports = router;
