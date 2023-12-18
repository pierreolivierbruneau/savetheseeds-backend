const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    date: Date,
    content: String,  
 });

const Answer = mongoose.model('answers', answerSchema);

module.exports = Answer;