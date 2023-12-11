var express = require('express');
var router = express.Router();
const Seed = require('../models/seeds');

router.post('/newseed', function (req, res, next) {
    Seed.findOne({ seedname: req.body.seedname }).then(data => {

        const userId = req.body.id;

        if (data) {
            const newNumberSemis = data.numbersemis + 1;


            Seed.updateOne({_id : data._id}, {numbersemis: newNumberSemis})
        .then(savedSeed => {
                console.log(savedSeed);
                res.json({ result: true, data: savedSeed })
            });

        } else {

            

            const newSeed = new Seed({
                user: userId,
                seedname: req.body.seedname,
                numbersemis: req.body.numbersemis,
            });

            newSeed.save().then(data => {
                console.log(data)
                res.json({ result: true, data })

            });

        }
    })
})


router.get('/findseeds', function (req, res, next) {

    Seed.findOne({ username: req.body.username }).then(data => {
        res.json({ result: true, value: data.numbersemis })
    })
})


module.exports = router;
