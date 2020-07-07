const mongoose = require("mongoose");

const friendshipSchema = new mongoose.Schema({
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps: true
})


const Friendship = mongoose.model("Friendship",friendshipSchema);

module.exports = Friendship;
