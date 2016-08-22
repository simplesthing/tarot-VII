var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require('./lib/config/config');
var path = require('path');
var fs = require('fs');
var cors = require('cors');

//Connect to DB
var db = require('./lib/db/db').db;

//Bootstrap models
var modelsPath = path.join(__dirname, 'lib/db/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

//var corsOptions = {
//  origin: 'http://something.com'
//};

app.use(cors());

//Load Routes
require('./lib/config/routes')(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req,res){
  res.status(400);
  res.json({
    "data": "Resource Not Found"
  });
});

app.use(function(err, req, res, next) {
  res.status(500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.listen(config.port);




