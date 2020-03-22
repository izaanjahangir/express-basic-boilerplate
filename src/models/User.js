const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  fullName: {
    type: String,
    required: [true, "Full name is required"]
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    select: false
  },
  profilePicture: {
    type: Object
  },
  lastPasswordChanged: {
    type: Date,
    select: false
  }
});

schema.plugin(uniqueValidator, { message: "{PATH} already exist." });

schema.methods.getPublicProfile = function() {
  const user = this.toObject();

  delete user.password;
  delete user.provider;
  delete user.location;

  return user;
};

const User = mongoose.model("user", schema);

module.exports = User;
