const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");


let opts = {
    jwtFromRequest : extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : "codeial"
}

passport.use(new jwtStrategy(opts, function(jwtPayload, done){
    User.findById(jwtPayload._id, function(err, user){
        if(err){
            console.log("Error in finding user -> JWT");
        }
        else{
            if(user){
                return done(null, user);
            }else{
                return done(null, flase);
            }
        }
    })
}));

module.exports = passport;