//This file is used for creation of initial data for our database to provide sample data that we can work with

var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
    {
    name:"Clouds Arena", 
    image:"https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg",
    description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ipsa nostrum repudiandae nemo recusandae totam voluptate distinctio possimus illum optio ut beatae obcaecati minus quos, nisi at, vero laboriosam dolorum!"
    },
    {
    name:"Camper Paradise ", 
    image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",
    description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ipsa nostrum repudiandae nemo recusandae totam voluptate distinctio possimus illum optio ut beatae obcaecati minus quos, nisi at, vero laboriosam dolorum!"
    },
    {
        name:"Zugo Campgrounds", 
        image:"https://farm1.staticflickr.com/112/316612921_f23683ca9d.jpg",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ipsa nostrum repudiandae nemo recusandae totam voluptate distinctio possimus illum optio ut beatae obcaecati minus quos, nisi at, vero laboriosam dolorum!"
    },
    {
        name:"Dandy Sites", 
        image:"https://farm3.staticflickr.com/2919/14554501150_8538af1b56.jpg",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ipsa nostrum repudiandae nemo recusandae totam voluptate distinctio possimus illum optio ut beatae obcaecati minus quos, nisi at, vero laboriosam dolorum!"
    },
    {
        name:"Hidey Grounds", 
        image:"https://farm5.staticflickr.com/4106/5096334506_86b850f551.jpg",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ipsa nostrum repudiandae nemo recusandae totam voluptate distinctio possimus illum optio ut beatae obcaecati minus quos, nisi at, vero laboriosam dolorum!"
    },
];

function seedDB() {
  // Remove everything from the database
  Campground.remove({}, function(err) {

    if (err) {
      console.log(err);
    } else {
      console.log("Removed Campgrounds");
    }
  });
  //Add few campgrounds
  data.forEach(function(seed){
    Campground.create(seed,function(err,campground){
        if (err){
            console.log(err);
        }else{
            console.log("added a campground");
            //Add few comments
            Comment.create(
                {text:"This place is great but i wish i had network signal",
                author: "Homer"
                },function(err,comment){
                    if(err){
                        console.log(err);
                    }else{
                            campground.comments.push(comment);
                            console.log("Created New Comment");
                            campground.save();
                    }
                }
            )
        }
    });
 

});
  
}

module.exports = seedDB;      

