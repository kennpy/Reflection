// requires the model with Passport-Local Mongoose plugged in
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/userModel");

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
