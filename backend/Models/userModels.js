const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, "Please enter valid username"], unique: true, lowercase: true },
  email: { type: String, required: [true, "Please enter valid & unique email"], validate: [isEmail, "Please enter a valid email"], unique: true, lowercase: true },
  password:  {type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters']},
});

// There are mongoose hooks method to use before & after saving a doc

// fire a function after doc saved to db, doc is the doc created
userSchema.post('save', function (doc, next) {
  console.log('User succesfully saved', doc);
  next();
});

// fire a function before doc saved to db: after succesfully saving you'll see _v: 0
// there's only next, not doc since it's before
// this refers to the instance
userSchema.pre('save', async function(next) {

  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10); //generate a random number as salt round
  this.password = await bcrypt.hash(this.password, salt);
  console.log(salt, this.password);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
