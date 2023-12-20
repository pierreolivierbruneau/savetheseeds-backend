const mongoose = require('mongoose');

const poingpsSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    latitude: Number,
    longitude: Number,

});

const Pointgps = mongoose.model('pointgps', poingpsSchema);

module.exports = Pointgps;