// Load mongoose package
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true},
  email: {type: String, required: true, trim: true},
  password: {type: String, required: true},
  phone: Number,
  created_at: { type: Date, default: Date.now },
  deleted: {type: Boolean, default: false},
});

const User = mongoose.model('User', UserSchema);
module.exports = User;



User.count({}, function(err, count) {
  if (err) {
    throw err;
  }
  if (count > 0) return ;

    const files = require('./file.seed.json');
    User.create(files, function(err, newFiles) {
      if (err) {
        throw err;
      }
      console.log("DB seeded")
    });
});
