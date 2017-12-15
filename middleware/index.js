//require the database dependencies
var Campground= require("../models/campground");
var Comment= require("../models/comment");


// all the middleware goes here
var middlewareObj = {};

//check campground ownership
middlewareObj.checkCampgroundOwnership = function(req, res, next) {
  //is user logged in?
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function(err, foundCampground) {
      if (err) {
        res.redirect("back");
      } else {
        //does user own the campground?
        if (foundCampground.author.id.equals(req.user.id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back"); //this takes user back to where they came from
  }
};

//check comment ownership
middlewareObj.checkCommentOwnership = function(req, res, next) {
  //is user logged in?
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
      if (err) {
        res.redirect("back");
      } else {
        //does user own the comment?
        if (foundComment.author.id.equals(req.user.id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back"); //this takes user back to where they came from
  }
};

//put this function anywhere you want autentication to be checked
middlewareObj.isLoggedIn = function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

module.exports = middlewareObj;
