//require all packages
var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment"),
  User = require("./models/user"),
  seedDB = require("./seeds");

//connect mongodb and create yelp_camp db
mongoose.connect("mongodb://localhost/yelp_camp");
// Set body parser package get the form data out of forms.
app.use(bodyParser.urlencoded({ extended: true }));
//set the route engine for view to allow the use of filenames without .ejs extension
app.set("view engine", "ejs");
//connect the style sheet by serving data from the public folder which we created
app.use(express.static(__dirname + "/public"));
//execute the seedDB function to populate the db anytime the server is started.
seedDB();


//<-------  REQUIRE ALL THE ROUTES FILES --->
var commentRoutes     = require("./routes/comments"),
    campgroundRoutes  = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index");



//PASSPORT CONFIGURATION
app.use(
  require("express-session")({
    secret: "testbed",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//parse the logged in user data from passport to all the routes [console.log(req.user)]
app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();
});

//make all the routes visible 
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);



//Server initialization
app.listen(3000, function(req, res) {
  console.log("Server started, listening on port 3000");
});
