var express = require("express");
var router = express.Router();
var Campground = require("../models/campground"); 

  //campgrounds pages route  <-INDEX
  router.get("/campgrounds", function(req, res) {
    //Get all campgrounds from Mongo DB and render to the page
    Campground.find({}, function(err, allCampgrounds) {
      if (err) {
        console.log(err);
      } else {
        res.render("campgrounds/index",{campgrounds:allCampgrounds});
      }
    });
  });
  
  // Setup new campground POST route  <- CREATE
  router.post("/campgrounds", isLoggedIn,function(req, res) {
    //get data from form(req.body body parser) and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = { name: name, image: image, description: desc };
    // campgrounds.push(newCampground);
    // Create a new campground and save to the mongo DB
    Campground.create(newCampground, function(err, newlyCreated) {
      if (err) {
        console.log(err);
      } else {
        //redirect back to campgrounds page
        res.redirect("/campgrounds");
      }
    });
  });
  
  // Setup route to show form  <-NEW
  router.get("/campgrounds/new",isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
  });
  
  //Show information about one campground
  router.get("/campgrounds/:id", function(req, res) {
    //find the campground with provided ID
    console.log(req.params.id);
    Campground.findById(req.params.id)
      .populate("comments")
      .exec(function(err, foundCampground) {
        if (err) {
          console.log(err);
        } else {
          console.log(foundCampground);
          //Render Show template with provided campground
          res.render("campgrounds/show", { campground: foundCampground });
        }
      });
  });
  
  // MIDDLEWARE -- put this function anywhere you want autentication to be checked 
function isLoggedIn(req,res, next){ 
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect("/login");
}



module.exports=router;
