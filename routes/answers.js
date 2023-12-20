var express = require("express");
var router = express.Router();

const Message = require("../models/message");
const Answer = require("../models/answers");
const User = require('../models/users')

router.post('/:slug', (req, res) => {
    User.findOne({token: req.body.token}).then (data => {
        console.log('data is:', data)
        console.log('token is:', req.body.token)
        if (data) {
            console.log('slug is:', req.params.slug)

            const userId = data.id;
            
            Message.findOne({slug: req.params.slug}).then (data => {

            
              
                if(data) {

                    const newAnswer = new Answer({
                        author: userId,
                        date: new Date(),
                        content: req.body.content,
                    });
            
                    newAnswer.save().then(answerData => {
                        console.log(data._id)
                        Message.findByIdAndUpdate(data._id, {
                            $push: {answers: answerData._id}
                        }).then(()=> {
                            console.log(data)
                            res.json({result: true})

                        })
                    })
                }
            })
    } else {
        res.json({ result: false, error: "User not foundddd" });
      }
    })
});

router.get(`/allanswers`, (req,res) => {
    Message.find()
    .populate("answers")
    .populate("author")
    .then((data) => {
        console.log(data[0])
        res.json({result: true, answers: data})
    })
})



module.exports = router;