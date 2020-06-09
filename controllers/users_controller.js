const User = require("../models/user");

module.exports.profile = function (request, response) {
    return response.render("user_profile", { title: "Home", name: "Welcome", email: "none" });
}

module.exports.comment = function (request, response) {
    return response.end("<h1>Write a comment</h1>");
}

module.exports.signIn = function (request, response) {
    return response.render("sign-in", { title: "Codeial / Sign-in" });
}

module.exports.signUp = function (request, response) {
    return response.render("sign-up", { title: "Codeial / Sign-up" });
}

module.exports.create = function (request, response) {
    if (request.body["password"] != request.body["confirm-password"]) {
        console.log("password and confirm password not equal!");
        return response.redirect("back");
    }
    User.findOne({ email: request.body.email }, function (err, user) {
        if (err) { console.log("Error in founding user!"); }

        if (!user) {
            User.create(request.body, function (err, user) {
                if (err) { console.log("Error in creating this user!"); }
                else { console.log("User Created Hurrah!"); }
                return response.redirect("sign-in");
            })
        }
        else {
            console.log("User already exists")
            return response.redirect("sign-in");
        }
    })
}

module.exports.createSession = function (request, response) {

    // steps to authenticate 
    // find the user
    User.findOne({ email: request.body.email }, function (err, user) {
        if (err) { console.log("Error in founding user!"); }
        if (!user) {
            // handle user not found
            console.log("User not found!!");
            return response.redirect("back");

        }
        else {
            // user found handle mismatch passwords 
            if (user.password != request.body.password) {
                console.log("password is incorrect for " + user.name);
                return response.redirect("back");
            }
            else {
                // handle session creation
                console.log("user found")
                response.cookie("user_id", user.id);
                return response.redirect("/profile");
            }
        }

    })
}


module.exports.signOut = function (request, response) {
    response.cookie("user_id", "");
    return response.redirect("/users/sign-in");
}