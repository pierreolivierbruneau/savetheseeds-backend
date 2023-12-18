var express = require("express");
var router = express.Router();

const Answer = require("../models/answers");
const User = require('../models/users')

router.post('/newanswer', (req, res) => {
    User.findOne({token: req.body.token}).then (data => {
        if (data) {

        const userId = data.id;

        const newAnswer = new Answer({
            author: userId,
            date: new Date(req.body.date),
            content: req.body.content,
        });

        newAnswer.save().then(data => {
            console.log(data)
            res.json({result: true})
        })
    } else {
        res.json({ result: false, error: "User not found" });
      }
    })
});

router.get('/allanswers', (req, res) => {
    Answer.find().then((data) => {
        res.json({result: true, answer: data})
    })
})



module.exports = router;