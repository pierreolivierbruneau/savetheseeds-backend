const mongoose = require("mongoose");

const tutoSchema = new mongoose.Schema({
  titre: String,
  description: String,
  graine: String,
  région: String,
});

const Tuto = mongoose.model("Tuto", tutoSchema);
module.exports = Tuto;
