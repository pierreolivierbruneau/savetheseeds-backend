var express = require("express");
var router = express.Router();
const Seed = require("../models/seeds");
const User = require("../models/users");

router.post("/newseed", function (req, res, next) {
  // Vérifie qu'il y a bien une plante envoyée
  console.log("VOICI: ", req.body.seedname);
  if (req.body.seedname == "") {
    console.log("finito");
    return;
  }
  Seed.findOne({ seedname: req.body.seedname }).then((data) => {
    if (data) {
      const newNumberSemis = data.numbersemis + 1;

      Seed.updateOne({ _id: data._id }, { numbersemis: newNumberSemis }).then(
        (savedSeed) => {
          res.json({ result: true, data: savedSeed });
        }
      );
    } else {
      User.findOne({ token: req.body.token }).then((data) => {
        const userId = data._id;

        const newSeed = new Seed({
          user: userId,
          seedname: req.body.seedname,
          numbersemis: 1, //instencier à un
        });

        newSeed.save().then((data) => {
          console.log(data);
          res.json({ result: true, value: data._id });
        });
      });
    }
  });
});

// recupérer le nombre de seed par User (pages profil )

router.post("/findseeds", function (req, res, next) {
  console.log("token is :", req.body.token);

  User.findOne({ token: req.body.token }).then((data) => {
    console.log(data);
    Seed.find({ user: data._id }).then((data) => {
      console.log("listeseed:", data);

      let seedsum = 0;
      for (let i = 0; i < data.length; i++) {
        seedsum += data[i].numbersemis;
      }

      res.json({ result: true, value: seedsum });
    });
  });
});

// incrément le nombre total de semis sur la page principal

router.get("/allseeds", function (req, res, next) {
  Seed.find().then((data) => {
    let sum = 0;

    for (let i = 0; i < data.length; i++) {
      sum += data[i].numbersemis;
    }
    res.json({ result: true, value: sum });
  });
});

module.exports = router;
