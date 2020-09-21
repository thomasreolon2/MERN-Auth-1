const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  resetLink: {
    data: String,
    default: "",
  },
});

userSchema.plugin(require("mongoose-bcrypt"));

userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function name(userPassword) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(userPassword, user.password, (err, isMatch) => {
      if (err) {
        return reject.error;
      }
      if (!isMatch) {
        return reject.error;
      }
      resolve(true);
    });
  });
};
mongoose.model("User", userSchema);
