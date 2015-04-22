// access the express module
var express = require("express");

// create an express server instance
var app = express();

// listen on at the root '/' of the domain
app.get("/", function(request, response) {
  response.send("<h1>Hello World!</h1>");
 });

// find the port from the environment
var port = process.env["PORT"];

// start listening on the port
app.listen(port);
