// Environmental Vars
var port        = process.env["PORT"];
var databaseURL = process.env["DATABASE_URL"];
var mandrillKey = process.env["MANDRILL_KEY"];

//// modules
var express        = require("express");
var fs             = require("fs");
var bodyParser     = require('body-parser');
var pg             = require('pg'); 
var expressLayouts = require('express-ejs-layouts');
var mandrill       = require('mandrill-api/mandrill');

//// Mandril TODO: move to mailer.js file
var mandrill_client = new mandrill.Mandrill(mandrillKey);

console.log("Database - " + databaseURL);
console.log("Port #   - " + process.env["PORT"])

// database connection
var db;
pg.connect(databaseURL, function(err, client) {
  db = client;
})

// create an express server instance
var app = express();

// user layout files
app.use(expressLayouts)

////middleware
// request body parsing tools
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// serve up static files
app.use(express.static(__dirname + '/static'));

// add ejs templeting
app.set('view engine', 'ejs');
app.set('layout', 'layout') // defaults to 'layout'  

// logging
// app.use(function(request, response, next){
//   console.log("Request:", request);
//   next();
// })

//// Routes
// listen on at the root '/' of the domain
app.get("/", function(request, response, next) {
  response.render("index");
});

app.get("/demo", function(request, response, next){
  response.render("demo");
})

app.post("/users", function(request, response, next){
  if(authenticated(request.body["password"])){
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
  } else {
    console.log("You are unathorized. All your bases belong to us.")
    response.redirect("/admin?error=UNAUTHORIZED: All Your Bases Are Belong to Us")
  }
});

app.get("/admin", function(request, response, next){
  response.render("admin", {"error": request.query.error});
});

app.get("/confirmation", function(request, response, next){
  response.render("confirmation", {"email" : request.query.email });
});

app.post("/inquiry", function(request, response, next) {
  var body = request.body
  console.log("Request body: ")
  console.log(body)

  db.query("INSERT INTO inquiries (name, email, phone, location, ages, times) VALUES ($1, $2, $3, $4, $5, $6);", [body["name"], body["email"], body["phone"], body["location"], body["ages"], body["times"]], function(err, result) {
    if (err) {
      console.log("Record Not Saved")
      err.explanation = "Something has gone horribily wrong. Wish we knew what it was"
      response.status(500).send(err);
    } else {
      console.log("Record Saved to Database")
      // confirmationEmail({email_address: body["email_address"]})
      response.redirect('/confirmation?email=' + body["email"]);
    }
  });
});

//// Functions
function confirmationEmail(user){
  var messageText = ""

  fs.readFile(__dirname + "/mail_templates/welcome_email.txt", function(error, data) {
    if(error){
      console.log(error)
    } else {
      messageText = data.toString()
      console.log(messageText);

      var message = {
        "text": messageText,
        "subject": "Request for Info Recieived",
        "from_email": "david@tradecrafted.com",
        "from_name": "Cottage Class",
        "to": [{email: user.email_address}]
      }
      sendEmail(message)  
    }
  }); 
 }

function sendEmail(message){
  mandrill_client.messages.send({"message": message, "async": true }, function(result) {
      console.log(result);
  }, function(e) {
      // Mandrill returns the error as an object with name and message keys
      console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
  });
 }

 function authenticated(password){
  if(password === undefined){
    return false
  } else if(password.toLowerCase() === "manisha"){
    return true;
  } else {
    return false
  }
 }

// start listening on the port
app.listen(port);
