//// modules
var express    = require("express");
var bodyParser = require('body-parser');
var pg         = require('pg');
var databaseURL = process.env["DATABASE_URL"];
console.log("Database - " + databaseURL);

var db;

pg.connect(databaseURL, function(err, client) {
  db = client;
})

// create an express server instance
var app = express();

//logging middleware
// app.use(function(request, response, next){
//   console.log("Request at ", request.path);
//   next();
// })

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// look in the view directory. Use index.html as default. Override app.get()
// when this runs it overides app.get("/") below
app.use(express.static(__dirname + '/views'));

// serve up static files
app.use(express.static(__dirname + '/static'));

// app.use(bodyParser.urlencoded({ extended: true}));
// app.use(bodyParser.json());


//// Routes
// listen on at the root '/' of the domain
app.get("/", function(request, response, next) {
  // response.send("<h1>Hello There World!!!!</h1>");
  console.log(">>>>>>>>>>>>>>>>>>>")
  console.log(request.query["name"])
  next()
 });

app.post("/submit", function(request, response, next) {
  var body = request.body
  console.log("Request body: ")
  console.log(request.body)

    db.query("INSERT INTO users (type_token, channel_token, user_name, message_text) VALUES ($1, $2, $3, $4)", [req.params.type_token, req.params.channel_token, req.body.user_name, req.body.message_text], function(err, result) {
    if (err) {
      if (err.code == "23502") {
        err.explanation = "Didn't get all of the parameters in the request body. Send user_name and message_text in the request body (remember this is a POST request)."
      }
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });



  response.send("You're email address is: " + body["email"] + "We promise to not do anything uncool with it.")
 });




// find the port from the environment
var port = process.env["PORT"];

// start listening on the port
app.listen(port);
