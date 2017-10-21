 //require express packages
 var express = require("express");
 var app = express();

 //set the route engine for view to allow the use of filenames without .ejs extension
 app.set("view engine", "ejs");

//main route for hompage 
app.get("/",function(req,res){
    res.render("landing");
})

//campgrounds pages route
app.get("/campgrounds",function(req,res){
    //define the static DB
    var campgrounds = [
        {name: "Plain View", image:"https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg"},
        {name: "Camper Site", image:"https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg"},
        {name: "Mountain View", image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"}
    ];

    res.render("campgrounds",{campgrounds:campgrounds});
})

//Server initialization
 app.listen(3000, function(req,res){
     console.log("Server started, listening on port 3000");
 });