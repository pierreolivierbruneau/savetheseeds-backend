const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  title: String,
  slug: String,
  date_publish: Date,
  text: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "answers" }],
});

const Message = mongoose.model("messages", messageSchema);

module.exports = Message;
