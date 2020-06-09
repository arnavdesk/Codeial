module.exports.profile = function (request, response) {
    return response.render("user_profile", { title: "Welcome" });
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
    //todo
}

module.exports.createSession = function (request, response) {
    //todo
}
