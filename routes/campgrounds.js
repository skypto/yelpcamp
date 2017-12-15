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
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
    }
  });
});

// Setup new campground POST route  <- CREATE
router.post("/campgrounds", isLoggedIn, function(req, res) {
  //get data from form(req.body body parser) and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = { name: name, image: image, description: desc, author };
  // campgrounds.push(newCampground);
  // Create a new campground and save to the mongo DB
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      console.log(newlyCreated);
      //redirect back to campgrounds page
      res.redirect("/campgrounds");
    }
  });
});

// Setup route to show form  <-NEW
router.get("/campgrounds/new", isLoggedIn, function(req, res) {
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

// EDIT CAMPGROUND ROUTE
router.get("/campgrounds/:id/edit", checkCampgroundOwnership,function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
              res.render("campgrounds/edit", { campground: foundCampground });
});
})

// UPDATE CAMPGROUND ROUTE
router.put("/campgrounds/:id", checkCampgroundOwnership,function(req, res) {
  //find and update the correct campground
    // var data = {name: req.body.name, image: req.body.image, descripton: req.body.description} --replaced with nested solution req.body.campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(
    err,
    updatedCampground
  ) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      // redirect somewhere(show page)
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//DESTROY CAMPGROUND ROUTE (This is why we install method-overide)
router.delete("/campgrounds/:id",checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

//-- MIDDLEWARE -- 

//put this function anywhere you want autentication to be checked
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

//check campground ownership
function checkCampgroundOwnership(req,res,next){
  //is user logged in?
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function(err, foundCampground) {
      if (err) {
        res.redirect("back");
      } else {
            //does user own the campground?
            if (foundCampground.author.id.equals(req.user.id)){
              next();
             } else{
                 res.redirect("back")
            }
      }
    });
  } else {
    res.redirect("back")//this takes user back to where they came from
  }
}

module.exports = router;
