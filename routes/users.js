var express = require('express');
var router = express.Router();

const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');


/* s'enregister*/
router.post('/signup', function(req, res, next) {
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  
const hash = bcrypt.hashSync(req.body.password, 10);

  const newUser = new User({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    birthday: new Date (req.body.date),
    phone: req.body.number,
    email: req.body.email,
    password: hash,
    token: uid2(32),
   });

   newUser.save().then(doc => {
    res.json({result: true, token: doc.token})
            console.log(doc)
        });
})


//se connecter
router.get('/signin', function(req, res, next) {

  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }


  User.findOne({ username: req.body.username }).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true,token: data.token });
    } else {
      res.json({ result: false });
    }
   });


  });


  module.exports = router;