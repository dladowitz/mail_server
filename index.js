//// modules
var express    = require("express");
var bodyParser = require('body-parser');
var pg         = require('pg'); 
var ejs        = require('ejs');
var expressLayouts = require('express-ejs-layouts')

var databaseURL = process.env["DATABASE_URL"];
console.log("Database - " + databaseURL);
console.log("Port #   - " + process.env["PORT"])

// database connection
var db;
pg.connect(databaseURL, function(err, client) {
  db = client;
})

// create an express server instance
var app = express();

app.use(expressLayouts)
// app.use(app.router)

////middleware
// request body parsing tools
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// add ejs templeting
app.set('view engine', 'ejs');
app.set('layout', 'layout') // defaults to 'layout'  

// logging
// app.use(function(request, response, next){
//   console.log("Request at ", request.path);
//   next();
// })


//// Routes
// listen on at the root '/' of the domain
app.get("/", function(request, response, next) {
  // response.send("<h1>Hello There World!!!!</h1>");
  console.log(">>>>>>>>>>>>>>>>>>>")
  console.log("query string: " + request.query)
  var name = "david"
  next()
});

app.get("/users", function(request, response, next){
  db.query("SELECT * FROM USERS;", [], function(err, result){
    if (err) {
      err.explanation = "Not able to do query"
      response.status(500).send(err)
    } else {
      console.log("trying to render users page")

      // response.send(result.rows);
      response.render("userlist", {"users" : result.rows});
    }
  });
});

app.post("/submit", function(request, response, next) {
  var body = request.body
  console.log("Request body: ")
  console.log(request.body)

  db.query("INSERT INTO users (email_address) VALUES ($1);", [request.body["email"]], function(err, result) {
    if (err) {
      console.log("Record Not Saved")
      if (err.code == "23502") {
        err.explanation = "Something has gone horribily wrong. Wish we knew what it was"
      }
      response.status(500).send(err);
    } else {
      console.log("Record Saved to Database")
      response.send(result);
    }
  });
  // response.send("You're email address is: " + body["email"] + "We promise to not do anything uncool with it.")
});




// find the port from the environment
var port = process.env["PORT"];

// look in the view directory. Use index.html as default. 
app.use(express.static(__dirname + '/views'));

// serve up static files
app.use(express.static(__dirname + '/static'));

// start listening on the port
app.listen(port);
