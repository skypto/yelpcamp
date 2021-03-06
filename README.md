# yelpcamp
This Web Application allow users to view campgrounds with a short description as well as booking cost. Once you login or signup, you can begin to create your own campgrounds that includes a title, image address, pricing and short description. You will also be able to leave a comment or edit your campground data. 
Unregistered users can view and leave comments and reviews for each campsite.

TECHNOLOGIES USED: 
* FRONTEND: HTML5, CSS3, JavaScript and Bootstrap for responsive Layout
* BACKEND: NodeJS, NPM, ExpressJS, REST and PassportJS.
* DATABASE: MongoDB 
* Local Development in Visual Studio Code and source versioned with GIT.
* Remote Hosting on Heroku and MongoLab


[# VIEW LIVE DEMO](https://infinite-everglades-98908.herokuapp.com/)


VERSION CONTROL 
# V13.3.0
* Set environment variable to manage automatic switch between Test DB and production DB

`mongoose.connect(process.env.DATABASEURL)`

# V13.2.0
* Create production DB for Heroku and Test DB for local machine

# V13.1.0
* Change the listening port for the node server from 3000 to 5000

# V13.0.0
Remote hosting[DB on MLab, Node App on Heroku)
* Host node app on Heroku
* Connect node app to new database on mLab
* Migrate the changes to hosted app on Heroku

# V12.0.0
Dynamic Pricing for camp booking
This makes it possible to specify the cost of a campground during creation
Connect to new database instance for this experiment "mongodb://localhost/yelp_camp_v12"

# V11.1.0
Visual Enhancement of Landing Page
* Background Slider and animation

# V11.0.0
Adding in flash messages and Alerts
* Install and configure connect-flash npm package
* Add bootstrap alerts to header

# V10.4.0
* User can only edit His/Her Comments
* User can only delete His/Her Comments
* Hide/Show edit and delete buttons
* Refactor Middleware by moving to a separate file (middleware/index.js)

# V10.3.0
* Add Destroy Route
* Add Delete Button

Campground Destroy route: /campgrounds/:id
Comments Destroy route:   /campgrounds/:id/comments/:comment_id

# V10.2.0
Authorization/Permissions
* Add edit route for comments
* Add edit button to comments
* Add Update route for comment edit

# V10.1.0 
Authorization/Permissions
* User can edit only campground he/she created
* User can only delete his/her campground
* Hide/Show edit and delete buttons 


# V10.0.0
* Install package "method-override"
* Add Edit route for campgrounds
* Add link to Edit page
* Add Update route
* Add Delete route
* Fix $set problem

# V9.0.0
* Save username+id to newly created campgrounds

# V8.0.0 
* Associate users and comments
* Save authors name to a comment automatically
* Prevent unathenticated user from creating a campground


# V7.0.0
Major changes in application structure and routing
* Seperation of routes into files which can be required
* Usage of express router 

# V6.2.0
* Add logout route
* Prevent user from adding comment if not logged in
* Add links to navbar
* show/hide auth links correctly

# V6.1.0
* Add login routes
* Add login templates

# V6.0.0
User Autentication and login with passport
* Install all packages needed for authentication.

`$ npm install --save passport passport-local passport-local-mongoose express-session`
* Define 'user' model
* Configure Passport
* Add 'register' route
* Add 'register' template

* Minor Code refactoring for module requirements

# V5.0.0
* Add sidebar to show page
* Display comments nicely
* Create new public folder and store css styles

# V4.0.0
Improvement in comments feature 
* Introduce nested routes
* Possibility to create new comments
* Add comments on campground show page

``
STRUCTURE OF ROUTING
- INDEX       /campgrounds 
- NEW         /campgrounds/new
- CREATE      /campgrounds
- SHOW        /campgrounds/:id

Comments will take this form:
- NEW         campgrounds/:id/comments/new    GET
- CREATE      campgrounds/:id/comments        POST
``

# V3.0.0
Refactoring of codebase 
* Creation of models directory
* Use of model.exports
* Creation of a seeds file to perform an initial starting data population into database.
* Use 'require' keyword to import model items as dependencies for other apps to run.
* Create a new schema propery called comments   
* Make Comments visible 


# V2.1.0
Usage of restful Routing convention
* Define route for showing a single item (show route)
* Rename campgrounds.ejs to index.ejs to conform with the Logical Structure Naming Convention
* Update the Campground schema to add a 'description' to campground model 


| Name |     Url        |  Verb     | Description    |     
| ------    | ------    | ------    |   ------       |
|INDEX      |/dogs      |   GET     | Displays a list of all dogs|
|NEW        |/dogs/new  |   GET     | Display form to make a new dog|
|CREATE     |   /dogs      |   POST    | Add new dog to DB |
|SHOW       |/dogs/:id  |   GET     |  Shows info about one dog|


# V2.0.0
Introduce Mongo Database for persistence
* Install and configure mongoose
* Setup Campground model
* Use campground model inside of existing routes

Note: Install mongoose module in working folder for this to work.

```sh
$ npm install --save mongoose
```

# V1.4.0
Style the NavBar and forms
* Add a navbar to all templates
* Style the new campground form


# V1.3.0
Style the Campgrounds Page
* Add a better Header/Title
* Make campground display in a grid


# V1.2.0
Creating New Camp grounds
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

# V1.1.0
Layout and Basic Styling
* Create Header and Footer Partials
* Adding bootstrap



# V1.0.0
* Add a landing Page 
* Add a camp grounds page that list all the camp grounds


Each campground has:
* Name
* Image

`
Sample structure of static DB
[
    {name: "Kesse" , image:"http//:www.image.com"}
    {name: "Kesse" , image:"http//:www.image.com"}
    {name: "Kesse" , image:"http//:www.image.com"}
    {name: "Kesse" , image:"http//:www.image.com"}
    {name: "Kesse" , image:"http//:www.image.com"}
    {name: "Kesse" , image:"http//:www.image.com"}
    {name: "Kesse" , image:"http//:www.image.com"}
    {name: "Kesse" , image:"http//:www.image.com"}
]
`