module.exports.profile = function (request, response) {
    return response.render("user_profile", { title: "Welcome" });
}

module.exports.comment = function (request, response) {
    return response.end("<h1>Write a comment</h1>");
}