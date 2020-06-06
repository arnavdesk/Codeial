module.exports.home = function (request, response) {
    return response.end("<h1>Welcome to Home, Express is up for codeial.</h1>")
}

module.exports.play = function (request, response) {
    return response.end("<h1>Welcome to Playground, Express is up for codeial.</h1>")
}