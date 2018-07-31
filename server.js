// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Timestamp Microservice project
app.get("/api/timestamp/:date_string?", function(req, res, next) {
   var date = req.params.date_string;
  
   if (moment(date, moment.ISO_8601, true).isValid())  {
     date = new Date(date);
     date = {unix: date.getTime(), utc: date.toUTCString()};
   } else if (!date) {
     date = new Date(); 
     date = {unix: date.getTime(), utc: date.toUTCString()};
   } else {
     date = {"error": "Invalid Date"}; 
   }
  
  req.time = date;
  next();
}, function(req, res) {
 res.send(req.time);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});