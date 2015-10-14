var http = require('http');
var fs = require('fs');
var qs = require('querystring');

var PORT = 3000;

//will serve html and css content that is stored on the file system

var server = http.createServer(function(request, response) {

response.end('hello');

});

server.listen(PORT, function() {

  console.log('server listening on port ' + PORT);

});