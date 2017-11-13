/*jshint esversion: 6 */
/* jshint node: true */
let mongoose = require('mongoose');

mongoose.Promise = global.Promise;  // tell mongoose what promise library to use
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose: mongoose
};
