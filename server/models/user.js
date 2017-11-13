const mongoose = require('mongoose');

const User = mongoose.model('User', {
  email: {
    require: true,
    trim: true,
    type: String,
    minlength: 1,
  },
});

module.exports = {
  User,
};
