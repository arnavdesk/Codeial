module.exports.index = function(request,response){
    return response.json(200, {
        version: "v1",
        message : "Posts",
        data: {
            posts :[]
        }
    });
}