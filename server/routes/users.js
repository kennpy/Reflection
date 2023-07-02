// requires the model with Passport-Local Mongoose plugged in
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/userModel");
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const secretkey = "not-so-secret-key";

router.post("/register", register);

router.post("/login", login);

function register(req, res, next) {
  let Users = new User({ username: req.body.username });
  User.register(Users, req.body.password, function (err, user) {
    if (err) {
      res.json({
        success: false,
        message: "Your account could not be saved. Error: ",
        err,
      });
    } else {
      res.json({ success: true, message: "Your account has been saved" });
    }
  });
}

function login(req, res, next) {
  if (!req.body.username) {
    res.json({ success: false, message: "Username was not given" });
  } else {
    if (!req.body.password) {
      res.json({ success: false, message: "Password was not given" });
    } else {
      passport.authenticate("local", function (err, user, info) {
        if (err) {
          res.json({ success: false, message: err });
        } else {
          if (!user) {
            res.json({
              success: false,
              message: "username or password incorrect",
            });
          } else {
            req.login(user, function (err) {
              if (err) {
                res.json({ success: false, message: err });
              } else {
                const token = jwt.sign(
                  { userId: user._id, username: user.username },
                  secretkey,
                  { expiresIn: "24h" }
                );
                res.json({
                  success: true,
                  message: "Authentication successful",
                  token: token,
                  userId: user._id,
                  username: user.username,
                });
              }
            });
          }
        }
      })(req, res);
    }
  }
}
// Visiting this route logs the user out
router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/login");
});

router.get("/login-success", (req, res, next) => {
  console.log(req.session);
  console.log("success");

  res.send("You successfully logged in.");
});

router.get("/login-failure", (req, res, next) => {
  res.send("You entered the wrong password.");
});

function genPassword(password) {
  var salt = crypto.randomBytes(32).toString("hex");
  var genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
}

function validPassword(password, hash, salt) {
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
}
module.exports = router;
