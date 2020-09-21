const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");
require("dotenv").config();
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "you must be logged" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.jwtkey, async (err, payload) => {
    //if error
    if (err) {
      return res.status(401).send({ error: "you must be logged" });
    }
    //if run
    const userID = payload.userId;
    const user = await User.findById(userID);
    req.user = user;
    next();
  });
};
