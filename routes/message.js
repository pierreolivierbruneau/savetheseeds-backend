var express = require('express');
var router = express.Router();

const Message = require('../models/message');

router.post('/newmessage', (req, res) => {

        const newMessage = new Message({
            title: req.body.title,
            text: req.body.text,
            username: req.body.username, 
         });

         newMessage.save().then(data => {
            console.log(data)
            res.json({result: true, message: data.message})
         })
    
    });

    router.get('/allmessages', function (req, res) {

        Message.find().then(data => {
            res.json({ result: true, message: data })
        })
    });


module.exports = router;