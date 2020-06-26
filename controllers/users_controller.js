const User = require("../models/user");

module.exports.profile = async function (request, response) {

    try {
        let foundUser = await User.findById(request.query.id);
        return response.render("user_profile", { title: "Welcome", profile_user: foundUser });
    }
    catch (err) {
        console.log(err);
    }

    // User.findById(request.query.id, function(err, foundUser){
    //     if(err){
    //         console.log("error finding user");
    //         return response.redirect("back");
    //     }
    //     return response.render("user_profile", { title: "Welcome", profile_user:foundUser });
    // })
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

module.exports.create = async function (request, response) {
    if (request.body["password"] != request.body["confirm-password"]) {
        request.flash("error","Password and confirm password must be same!");
        console.log("password and confirm password not equal!");
        return response.redirect("back");
    }

    try {
        let user = await User.findOne({ email: request.body.email });
        if (!user) {
            let newUser = await User.create(request.body);
            request.flash("success","Welcome to codeial! Please login!");
            console.log("User Created Hurrah!");
            return response.redirect("sign-in");
        } else {
            request.flash("error","User already exists");
            console.log("User already exists")
            return response.redirect("sign-in");
        }
    }
    catch (err) {
        console.log(err);
    }

    // User.findOne({ email: request.body.email }, function (err, user) {
    //     if (err) { console.log("Error in founding user!"); }

    //     if (!user) {
    //         User.create(request.body, function (err, user) {
    //             if (err) { console.log("Error in creating this user!"); }
    //             else { console.log("User Created Hurrah!"); }
    //             return response.redirect("sign-in");
    //         })
    //     }
    //     else {
    //         console.log("User already exists")
    //         return response.redirect("sign-in");
    //     }
    // })
}

module.exports.createSession = function (request, response) {
    request.flash("success","Logged In Successfully!");
    return response.redirect("/users/profile?id=" + request.user.id);
}

module.exports.destroySession = function (request, response) {
    request.flash("success","You have logged Out!");
    request.logout();
    return response.redirect("/");
}


module.exports.update = async function (request, response) {

    try {
        if (request.query.id == request.user.id) {
            request.flash("success","Profile Updated Successfully!");
            let user =  await User.findByIdAndUpdate(request.query.id, request.body);
            return response.redirect("back");
        } else {
            return response.status(401).send("Unauthorized!");
        }
    }
    catch(err){
        request.flash("error","Error Updating Profile!");
        console.log(err);
        return response.redirect("back");
    }

}