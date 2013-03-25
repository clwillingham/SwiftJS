var mongoose = require('mongoose');

var schema = mongoose.Schema({
    username: String,
    password: String
});

module.exports = mongoose.model('users', schema);