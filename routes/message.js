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
      date_publish: new Date(getCurrentDateAndTime), //get current date and time from value in DB
      text: req.body.text,
      author: user._id,
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

//filter the msg stored into DB  and use regex to compare the params
router.get("/filtermessage/:msg", function (req, res) {
  let regex = new RegExp(req.params.msg, "i");

  Message.find({ $and: [{ $or: [{ title: regex }, { text: regex }] }] }).then(
    (data) => {
      res.json({ message: data });
    }
  );
});

router.get("/getmessage/:slug", (req, res) => {
  Message.findOne({ slug: req.params.slug })
    .populate("author")
    .then((data) => {
      res.json({ result: true, forum: data });
    });
});

module.exports = router;
