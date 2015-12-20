var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require('./lib/config/config');

require('./lib/db/db');
require('./lib/config/routes')(app);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(config.port);





