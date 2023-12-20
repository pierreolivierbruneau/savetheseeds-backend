var express = require('express');
var router = express.Router();

const User = require("../models/users");
const Pointgps = require("../models/pointgps");

/* GET home page. */
router.post('/savepointgps', function (req, res, next) {

    User.findOne({ token: req.body.token }).then((data) => {
        const userId = data._id;

        const newPointgps = new Pointgps({
            user: userId,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
        });

        newPointgps.save().then((data) => {
            console.log(data);
            res.json({ result: true });
        });
    });
});



router.post('/displaypointgps', function (req, res, next) {
    User.findOne({ token: req.body.token }).then((data) => {
        console.log(data);

        Pointgps.find({ user: data._id }).then((data) => {
            console.log("listeseed:", data);

          const value = data.map(el => {
            return (
                {lat:el.latitude, lng:el.longitude}
            )
          })

        //   console.log(value)
            res.json({ result: true, value });
        });
    });
})

module.exports = router;