module.exports.home = function (request, response) {
    console.log(request.cookies);
    response.cookie("user_id", 25);
    response.cookie("user_id_new", 25);
    return response.render("home", { title: "Welcome" });
}

