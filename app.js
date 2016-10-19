var express = require('express');
var app = express();
var path = require('path');
var parseString = require('xml2js').parseString;
var http = require('http');

// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');   // instruct express to server up static assets
app.use(express.static('public'));


//Controllers
//var gamedayController = require('/controllers/gameday.js');
var url = "http://reports.statnet.se/report/20161013-gameday.xml";
var gameDaySummary;

function xmlToJson(url, callback) {
  var req = http.get(url, function(res) {
    var xml = '';

    res.on('data', function(chunk) {
      xml += chunk;
    });

    res.on('error', function(e) {
      callback(e, null);
    });

    res.on('timeout', function(e) {
      callback(e, null);
    });

    res.on('end', function() {
      parseString(xml, {ignoreAttrs: true, explicitRoot: false },function(err, result) {
        callback(null, result);
      });
    });
  });
}

xmlToJson(url, function(err, data) {
  if (err) {
    // Handle this however you like
    return console.err(err);
  }
  gameDaySummary = data;
  //console.log(gameDaySummary.Games[0].GameDayItem);
});

// set routes
app.get('/', function(req, res) {
  res.render('index');
});
app.get('/gameday', function(req, res) {
  res.render('index', {games: gameDaySummary.Games[0].GameDayItem});
});
// Set server port
app.listen(4000);
console.log('server is running');

