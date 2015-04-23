//// modules
var express = require("express");
// var bodyParser = require("body-parser")


// create an express server instance
var app = express();

// look in the view directory. Use index.html as default. Override app.get()
app.use(express.static(__dirname + '/views'));

// serve up static files
app.use(express.static(__dirname + '/static'));

// app.use(bodyParser.urlencoded({ extended: true}));
// app.use(bodyParser.json());

// //logging middleware
// app.use(function(req, res, next){
//   console.log("Request at ", req.path);
//   next();
// })


//// Routes
// listen on at the root '/' of the domain
app.get("/", function(request, response) {
  response.send("<h1>Hello There World!!!!</h1>");
 });

app.post("/submit", function(request, response) {
  console.log("post request coming in")
  response.send("Thanks for the email address")
 });




// find the port from the environment
var port = process.env["PORT"];

// start listening on the port
app.listen(port);
