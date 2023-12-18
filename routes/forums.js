var express = require("express");
var router = express.Router();

const Forum = require('../models/forums');


router.get('/getPost/:slug', (req, res) => {
    Forum.findOne({ slug: req.params.slug }).then((data) => {
        res.json({ result: true, forum: data })
    })

})



module.exports = router;