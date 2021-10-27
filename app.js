//get express api
const express = require("express");
//path module to deal with file paths
const path = require("path");
//get logger form logger.js
const logger = require('./middleware/logger');
//initialize express
const myApp = express();
//get express handlebars
const handebars = require("express-handlebars");
//get users
const users = require("./Users");


//this is to initialize the funtion 
myApp.use(logger);

//middleware for handlebars. NEeded to use handlebars
myApp.engine('handlebars', handebars({ defaultLayout: 'main' })); //setting the default layout
myApp.set("view engine", "handlebars");


//parse the body using middleware
myApp.use(express.json());
myApp.use(express.urlencoded({ extended: false }));




//render index view. Home page route and add data to the page
myApp.get('/', (request, response) =>
    response.render("index", {
        title: 'Welcome new users!!!!',
        users
    })
);

//create a route
/*myApp.get('/', (request, response) => {
    //  response.send("<h2>First Express html header???? </h2>");

    //send a file form the current directory form the public folder and called index.html
    response.sendFile(path.join(__dirname, 'public', 'index.html'));
});*/


//setting up a static folder(public)
//this is for setting up a static server
myApp.use(express.static(path.join(__dirname, 'public')));

//users api route
myApp.use("/api/users", require("./routes/api/users"));

//add port number . When the app lauches it has port nro in enviroment variable so check that first then  run on port 5000
const PORT = process.env.PORT || 5000;


myApp.listen(PORT, () => console.log(`My server activate using port nro: ${PORT}`));