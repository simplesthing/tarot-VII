
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(request, response){
  response.send({foo: 'hello world'});
});

app.post('/doStuff', function(request, response){
  var foo = request.param('foo');
  response.send({
    param: foo
  });
});

app.listen(3000);
