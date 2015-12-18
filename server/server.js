var http = require('http');

http.createServer(function(request, response){

  response.writeHead({
    'Content-Type': 'text/plain'
  });
  response.end('hekki world');

}).listen(3000);

