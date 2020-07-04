const User = require("../../../models/user");
const jwt = require("jsonwebtoken");

module.exports.createSession = async function (request, response) {
    try {
        let user = await User.findOne({ email: request.body.email });
        if(!user || user.password!=request.body.password){
            return response.json(422,{
                message:"Invalid username or password"
            })
        }
        else{
            return response.json(200,{
                message:"Sign in sucessful take the token and keep it safe",
                data:{
                    token: jwt.sign(user.toJSON(),"codeial",{expiresIn:100000})
                }
            })
        }
    } catch (error) {
        console.log(err);
        return response.json(500,{
            message:"Internal Server Error"
        })
    }
}