var express = require('express');
var router = express.Router();
const Seed = require('../models/seeds');
const User = require('../models/users')

router.post('/newseed', function (req, res, next) {
    Seed.findOne({ seedname: req.body.seedname }).then(data => {

        

        if (data) {
            const newNumberSemis = data.numbersemis + 1;


    Seed.updateOne({_id : data._id}, {numbersemis: newNumberSemis})
        .then(savedSeed => {
                console.log(savedSeed);
                res.json({ result: true, data: savedSeed })
            });

        } else {

    User.findOne({token: req.body.token}).then(data => {
            const userId = data.id; 
            
            const newSeed = new Seed({
                user: userId,
                seedname: req.body.seedname,
                numbersemis: req.body.numbersemis,
            });

            newSeed.save().then(data => {
                console.log(data)
                res.json({ result: true, data })

            });

        })

            

       

        }
    })
})


router.get('/findseeds', function (req, res, next) {

    Seed.findOne({ username: req.body.username }).then(data => {
        res.json({ result: true, value: data.numbersemis })
    })
})



router.get('/findseeds', function (req, res, next) {

    Seed.findOne({ username: req.body.username }).then(data => {
        res.json({ result: true, value: data.numbersemis })
    })
})


router.get('/allseeds', function (req, res, next) {

    Seed.find().then(data => {
        console.log(data)

        let sum =0

        for (let i=0 ; i < data.length; i++) {
            
            sum += data[i].numbersemis

            console.log('good', data[i].numbersemis)
        }
        res.json({ result: true, value: sum})
    })
})



module.exports = router;
