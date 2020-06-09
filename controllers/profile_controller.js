const User = require("../models/user");

module.exports.view = function (request, response) {

    if (request.cookies.user_id == undefined) {
        console.log("Please sign in");
        return response.redirect("/users/sign-in");
    }

    User.findById(request.cookies.user_id, function (err, user) {
        if (err) {
            console.log("Please sign in");
            return response.redirect("sign-in");
        }
        else {
            return response.render("user_profile", { title: user.name });
        }
    })
}