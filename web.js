#!/bin/env node

var express = require('express');
var mongoose = require('mongoose');
var app = express();

// connect to MongDB
var uristring = process.env.MONGOLAB_URI;

mongoose.connect(uristring, function (err, res) {
  if (err) { 
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});

// config
app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});

// set up API, handlers defined in api.js
var api = require('./controller/api.js');
app.post('/GeoTrackerOnHeroku', api.post);
app.get('/GeoTrackerOnHeroku/:lon/:lat/:dist?', api.near);
app.get('/GeoTrackerOnHeroku/:name/:descr/:latitude/:longitude?', api.save);
app.get('/GeoTrackerOnHeroku/:name.:format?', api.show);
app.get('/GeoTrackerOnHeroku', api.list);


//  start the app
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("GeoTrackerOnHeroku is listening on " + port);
});
