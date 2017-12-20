var mongoose = require("mongoose");

var MarksSchema = new mongoose.Schema({
   name: String,
   links:[
       {
           link:String
       }
   ]
});

module.exports = mongoose.model("Mark", MarksSchema);