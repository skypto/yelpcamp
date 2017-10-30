 //require express packages
 var express = require("express");
 var app = express();

 //require mongoose
 var mongoose = require("mongoose");

 //connect mongodb and create yelp_camp db
 mongoose.connect("mongodb://localhost/yelp_camp");

 // setup the Schema for yelp_camp db
 var campgroundSchema = new mongoose.Schema({
     name:String,
     image:String
 });

 //compile the schema into a model <--collection name is Campground in quotes
var Campground = mongoose.model("Campground",campgroundSchema);

 //Add in body-parser. BodyParser object exposes various factories to create middlewares. Available under the req.body
 // Allows to collect data from form
 var bodyParser = require("body-parser");
 app.use(bodyParser.urlencoded({extended:true}));

 //set the route engine for view to allow the use of filenames without .ejs extension
 app.set("view engine", "ejs");

// //Create a new campground for new Mongo DB         
// Campground.create(
//     {
//         name: "Camper Site", 
//         image:"https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg"
//     },function(err, campground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log('Newly created campground');
//             console.log(campground);
//         }
//     });

 //define the static DB
 var campgrounds = [
    {name: "Plain View", image:"https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg"},
    {name: "Camper Site", image:"https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg"},
    {name: "Mountain View", image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
    {name: "Plain View", image:"https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg"},
    {name: "Camper Site", image:"https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg"},
    {name: "Plain View", image:"https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg"},
    {name: "Camper Site", image:"https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg"},
    {name: "Plain View", image:"https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg"},
    {name: "Camper Site", image:"https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg"},
    {name: "Plain View", image:"https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg"},
    {name: "Camper Site", image:"https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg"},
];



//main route for hompage 
app.get("/",function(req,res){
    res.render("landing");
});

//campgrounds pages route
app.get("/campgrounds",function(req,res){
    // res.render("campgrounds",{campgrounds:campgrounds});

    //Get all campgrounds from Mongo DB and render to the page
    Campground.find({}, function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds",{campgrounds:allCampgrounds});
        }
    });
});


// Setup route to show form
app.get("/campgrounds/new",function(req,res){
    res.render("new");
});



// Setup new campground POST route
app.post("/campgrounds",function(req,res){
    //get data from form(req.body body parser) and add to campgrounds array
    var name=req.body.name;
    var image=req.body.image;
    var newCampground = {name:name, image:image};
    // campgrounds.push(newCampground);
    // Create a new campground and save to the mongo DB
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            //redirect back to campgrounds page
            res.redirect("campgrounds");
        }
    });
});

//Server initialization
 app.listen(3000, function(req,res){
     console.log("Server started, listening on port 3000");
 });

