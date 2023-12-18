const mongoose = require('mongoose');

const forumSchema = mongoose.Schema({
    title: String,
    content: String,
    date_publish: Date,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'answers' }],
    slug: String,
    
 });

const Forum = mongoose.model('forums', forumSchema);

module.exports = Forum;