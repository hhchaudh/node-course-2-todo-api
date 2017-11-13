/*jshint esversion: 6 */
/* jshint node: true */

let mongoose = require('mongoose');

let User = mongoose.model('User', {
    email: {
        require: true,
        trim: true,
        type: String,
        minlength: 1
    }
});

module.exports = {
    User: User
};