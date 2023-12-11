const mongoose = require('mongoose');

const seedSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    seedname: String,
    numbersemis: Number,
    username: String,
  
  
 });

const Seed = mongoose.model('seeds', seedSchema);

module.exports = Seed;