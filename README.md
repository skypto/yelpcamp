# yelpcamp

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