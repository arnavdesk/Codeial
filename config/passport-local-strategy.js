const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const User = require("../models/user");

passport.use(new localStrategy({
    usernameField: "email",
},
    function (email, password, done) {
        // find a user and establish identity
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log("error finding in user --> passport");
                return done(err);
            }
            if (!user || user.password != password) {
                console.log("Invalid username password");
                return done(null, false);
            }
            else {
                return done(null, user);
            }
        })
    }

))


// serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
})

// deserializing the user to decide which key is to be kept in cookies

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log("error finding in user --> passport --> Desirialize");
            return done(err);
        }
        return done(null, user);
    })
})

passport.checkAuthentication = function (request, response, next) {
    // if user is signed in then pass on request to next function(controllers action);
    if (request.isAuthenticated()) {
        return next();
    }
    else {
        // if user is not signed in then redirect
        return response.redirect("/users/sign-in");
    }
}

passport.checkSessionPresent = function (request, response, next) {
    // if user is signed in then don't go to sign in/up page
    if (request.isAuthenticated()) {
        return response.redirect("/users/profile");
    }
    else {
        // if user is not then go
        return next();
    }
}


passport.setAuthenticatedUser = function (request, response, next) {
    if (request.isAuthenticated()) {
        // request.user contains the current
        //  signed in user from session cookie and we are just sending in 
        // to user for views
        response.locals.user = request.user;
    }
    next();
}

module.exports = passport;