const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    //user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    title: String,
    text: String,
    username: String,
  
 });

const Message = mongoose.model('messages', messageSchema);

module.exports = Message;