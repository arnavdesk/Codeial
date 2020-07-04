// require them
const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;

// used for generating random strings
const crypto = require("crypto");
const User = require("../models/user");

// for getting keys from env
const dotenv = require('dotenv');
dotenv.config();

// tell passport to use a new strategy for google log in!
passport.use(new googleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8000/users/auth/google/callback",
},
    function (accessToken, refreshToken, profile, done) {
        // find a user
        User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
            if (err) {
                console.log("error finding in user --> Google Auth passport");
                // request.flash("error", "Internal Error In Google Auth");
                return done(err);
            }
            console.log(profile);
            // if found set the request as user
            if (user) {
                // console.log("Invalid username password");
                // request.flash("error","Invalid Username or Password!");
                return done(null, user);
            }
            else {
                // if not found create a user and set request.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString("hex"),
                    avatar: profile.photos[0].value,
                    auth: "google"
                }, function (err, user) {
                    if (err) {
                        console.log("error in creating user");
                        return done(err);
                    }
                    console.log("User Created Hurrah!");
                    return done(null, user);
                });
            }
        })
    }

));

module.exports = passport;