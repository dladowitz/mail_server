//// modules
var express = require("express");
var bodyParser = require('body-parser');


// create an express server instance
var app = express();

//logging middleware
app.use(function(request, response, next){
  console.log("Request at ", request.path);
  next();
})


// look in the view directory. Use index.html as default. Override app.get()
app.use(express.static(__dirname + '/views'));

// serve up static files
app.use(express.static(__dirname + '/static'));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


//// Routes
// listen on at the root '/' of the domain
app.get("/", function(request, response) {
  // response.send("<h1>Hello There World!!!!</h1>");
 });

app.post("/submit", function(request, response, next) {
  var body = request.body
  console.log("Request body: ")
  console.log(request.body)
  response.send("You're email address is: " + body["email"] + "We promise to not do anything uncool with it.")
 });




// find the port from the environment
var port = process.env["PORT"];

// start listening on the port
app.listen(port);
