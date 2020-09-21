const _ = require("lodash");
const bodyParser = require("body-parser");
const requireToken = require("../middleware/requireToken");
const nodemailer = require("nodemailer");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = mongoose.model("User");
require("dotenv").config();
module.exports = router;
router.get("/", requireToken, (req, res) => {
  return res.json(req.user);
});

router.put("/forgot-password", (req, res) => {
  const { email } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: "User with this email already exists." });
    }
    const token = jwt.sign({ userId: user._id }, process.env.jwtkeyForgotPass, {
      expiresIn: "20m",
    });

    let fromMail = "junior_santa_11@hotmail.com";
    let subject = "Enter subject line here";
    let text = "Enter email content.";
    const BASE_URL = "http://localhost:3000/";

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.login_gmail,
        pass: process.env.pass_gmail,
      },
    });

    // email options
    let mailOptions = {
      from: fromMail,
      to: email,
      subject: subject,
      text: text,
      html: `
      <h2>Please click on given link to forgot your password ;)</h2> 
      <p>${BASE_URL}/resetpassword/${token}</p>
     
      `,
    };

    return user.updateOne({ resetLink: token }, function (err, sucess) {
      if (err) {
        return res.status(400).json({ error: "reset password link error" });
      } else {
        transporter.sendMail(mailOptions, (error, response) => {
          if (error) {
            console.log(error);
          }
          console.log(response);
        });
        return res.status(200).json({
          message: "Email sucessfully sended",
        });
      }
    });
  });
});

router.put("/reset-password", (req, res) => {
  const { resetLink, newPass } = req.body;
  if (resetLink) {
    jwt.verify(resetLink, process.env.jwtkeyForgotPass, function (error) {
      if (error) {
        return res
          .status(401)
          .json({ error: "Incorrect token or it's expired" });
      }

      User.findOne({ resetLink }, (err, user) => {
        if (err || !user) {
          return res
            .status(400)
            .json({ error: "User with this token does not exist." });
        }

        const obj = {
          password: newPass,
          resetLink: "",
        };

        user = _.extend(user, obj);
        user.save((err, result) => {
          if (err) {
            return res.status(400).json({ error: "reset password error" });
          } else {
            return res.status(200).json({
              message: "Your password has been changed",
            });
          }
        });
      });
    });
  } else {
    return res.status(401).json({ error: "Authentication Error." });
  }
});

router.post("/signup", async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const user = new User({ email, password, username });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.jwtkey);
    res.send({ token }); //return token
  } catch (err) {
    res.status(422).send(err.message);
  }
});
router.post("/signin", async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "must provide the credentials" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: "must provide email or password" });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, process.env.jwtkey);
    res.send({ token }); //return token
  } catch (err) {
    return res.status(402).send({ error: "need fill email or password" });
  }
});
