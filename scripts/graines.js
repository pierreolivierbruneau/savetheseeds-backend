const mongoose = require("mongoose");
const Tuto = require("..models/tuto.js");

mongoose.connect(CONNECTION_STRING, {
  userNewurlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
