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
            //add username and id to comment 
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            //save comment
            comment.save();
            //connect new comment to campground
            campground.comments.push(comment);
          campground.save();
          console.log(comment);
          //redirect to campground show page
          res.redirect("/campgrounds/" + campground._id);
        });
      }
    });
  });


  // COMMENT EDIT ROUTE
  router.get("/campgrounds/:id/comments/:comment_id/edit",function(req,res){
    Comment.findById(req.params.comment_id,function(err, foundComment){
      if(err){
        res.redirect("back");
      }else{
        res.render("comments/edit",{campground_id: req.params.id, comment:foundComment});
      }
    })
  })

// UPDATE COMMENT
router.put("/campgrounds/:id/comments/:comment_id",function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
      if(err){
        res.redirect("back");
      }else{
        res.redirect("/campgrounds/"+req.params.id);
      }
    })
});

// MIDDLEWARE -- put this function anywhere you want autentication to be checked 
function isLoggedIn(req,res, next){ 
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;

