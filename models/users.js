var mongoose = require("mongoose");
var passwordHash = require('password-hash');


var UserSchema = new mongoose.Schema({
    image:String,
    displayName:String,
    firstName: String,
    lastName: String,
    email: String,
    password:String,
    createdAt: Date,
    accessToken : String,
    marks:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mark"
        }
    ]
});



module.exports = mongoose.model("User", UserSchema);