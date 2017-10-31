var mongoose= require("mongoose");

 // setup the Schema for yelp_camp db
 var campgroundSchema = new mongoose.Schema({
    name:String,
    image:String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
});

//compile the schema into a model <--collection name is Campground in quotes
module.exports = mongoose.model("Campground",campgroundSchema);