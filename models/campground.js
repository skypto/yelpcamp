var mongoose= require("mongoose");

 // setup the Schema for yelp_camp db
 var campgroundSchema = new mongoose.Schema({
    name:String,
    price:String,
    image:String,
    description: String,
    author: {
            id:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
});

//compile the schema into a model <--collection name is Campground in quotes
module.exports = mongoose.model("Campground",campgroundSchema);