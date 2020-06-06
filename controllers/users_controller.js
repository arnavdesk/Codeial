module.exports.profile = function (request, response) {
    return response.end("<h1>User profile</h1>");
}

module.exports.comment = function (request, response) {
    return response.end("<h1>Write a comment</h1>");
}