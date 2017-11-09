var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//===========================
// COMMENTS ROUTES
//===========================
router.get("/campgrounds/:id/comments/new",isLoggedIn,function(req, res) {
    //find campground by ID and send it through when we render
    Campground.findById(req.params.id, function(err, campground) {
      if (err) {
        console.log(err);
      } else {
        res.render("comments/new", { campground: campground });
      }
    });
  });
  
  router.post("/campgrounds/:id/comments",isLoggedIn, function(req, res) {
    //lookup campground using id
    Campground.findById(req.params.id, function(err, campground) {
      if (err) {
        console.log(err);
        res.redirect("/campgrounds");
      } else {
        // Our new notation allow for direct creation of object in the form
        console.log(req.body.comment);
  
        //create new comment
        Comment.create(req.body.comment, function(err, comment) {
          if (err) {
            console.log(err);
          } else
            //connect new comment to campground
            campground.comments.push(comment);
          campground.save();
          //redirect to campground show page
          res.redirect("/campgrounds/" + campground._id);
        });
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


module.exports = router;