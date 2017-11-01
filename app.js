 //require express packages
 var express = require("express");
 var app = express();

 //require mongoose
 var mongoose = require("mongoose");

 //connect mongodb and create yelp_camp db
 mongoose.connect("mongodb://localhost/yelp_camp");

 // require the Schema for campground collection
 var Campground= require("./models/campground");

 // require comment schema 
 var Comment = require("./models/comment");
 
//Require the seeds file to set initial values into the DB 
var seedDB = require("./seeds");
seedDB();

 //Add in body-parser. BodyParser object exposes various factories to create middlewares. Available under the req.body
 // Allows to collect data from form
 var bodyParser = require("body-parser");
 app.use(bodyParser.urlencoded({extended:true}));

 //set the route engine for view to allow the use of filenames without .ejs extension
 app.set("view engine", "ejs");

//-----------------------------------ROUTE DEFINITIONS----------------------------//

//main route for hompage
app.get("/",function(req,res){
    res.render("landing");
});

//campgrounds pages route  <-INDEX
app.get("/campgrounds",function(req,res){
   
    //Get all campgrounds from Mongo DB and render to the page
    Campground.find({}, function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    });
});


// Setup new campground POST route  <- CREATE
app.post("/campgrounds",function(req,res){
    //get data from form(req.body body parser) and add to campgrounds array
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var newCampground = {name:name, image:image, description:desc};
    // campgrounds.push(newCampground);
    // Create a new campground and save to the mongo DB
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});



// Setup route to show form  <-NEW
app.get("/campgrounds/new",function(req,res){
    res.render("campgrounds/new");
});



//Show information about one campground
app.get("/campgrounds/:id",function(req,res){
    //find the campground with provided ID
    console.log(req.params.id)
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
            if(err){
                console.log(err);
            }else{
                console.log(foundCampground);
                //Render Show template with provided campground
                res.render("campgrounds/show", {campground:foundCampground});
            }
    });
    
});

//===========================
// COMMENTS ROUTES
//===========================
app.get("/campgrounds/:id/comments/new",function(req,res){
    //find campground by ID and send it through when we render
    Campground.findById(req.params.id,function(err,campground){
        if (err){
            console.log(err);
        }else{
            res.render("comments/new",{campground:campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req,res){
    //lookup campground using id
    Campground.findById(req.params.id,function(err,campground){
        if (err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            // Our new notation allow for direct creation of object in the form 
             console.log(req.body.comment)
            
            //create new comment
            Comment.create(req.body.comment,function(err, comment){
                if (err){
                    console.log(err);
                }else
                campground.comments.push(comment);
                campground.save();
                res.redirect('/campgrounds/'+campground._id);
            });

    //connect new comment to campground
    //redirect to campground show page
        }
    
    })
});

//Server initialization
 app.listen(3000, function(req,res){
     console.log("Server started, listening on port 3000");
 });

