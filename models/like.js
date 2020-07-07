const mongoose = require("mongoose");

const likesSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    // Define the id of liked object
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath: "onModel",
    },
    // this field is used for defining the type of liked object since this is the dynamic reference
    onModel:{
        type:String,
        required:true,
        enum:["Post","Comment"],

    }

}, { timestamps: true });


const Like = mongoose.model("Like",likesSchema);


module.exports = Like;