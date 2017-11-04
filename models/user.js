var mongoose = require("mongoose");

//add passport local plugin
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

// allow passportLocal to have ability to add method to our schema
UserSchema.plugin(passportLocalMongoose);

module.exports= mongoose.model("User",UserSchema);