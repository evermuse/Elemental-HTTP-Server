var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var url = require('url');

//template module to format the JSON POST data into a newly formatted page

var buildPage = require('./template');

//declare the port

var PORT = 3000;

//server to direct traffic

var server = http.createServer(function(request, response) {

  //new buffer

  var dataBuffer = '';

  //throw new data into the buffer

  request.on('data', function(data) {

    dataBuffer += data;

  });

  //parse the buffer for the url and content and either create the new page or serve up the existing one

  request.on('end', function() {

    var urlObj = url.parse(request.url);

    var newPage = qs.parse(dataBuffer.toString());

    //create new page based on POST data sent to generic /elements uri using template module and respond with success object

    if (urlObj.path === '/elements' && request.method === 'POST' ) {

      fs.writeFile('public/' + newPage.elementName.toLowerCase() + '.html', buildPage(newPage), function(err) {

        response.writeHead(200, { 'Content-Type' : 'application/json' });

        response.end(JSON.stringify({ 'success' : true } ));

      });

    } else {

      //read the files

      fs.readFile('./public' + urlObj.path, function(err, data) {

        //test if the file exists and throw error if not

        if (err) {

          return fs.readFile('./public/404.html', function(err, data) {

            if (err) { return 'The page you wanted can not be located'; }

            response.end(data);

          });

        }

        response.end(data);

      });

    }

  });

});

server.listen(PORT, function() {

  console.log('server listening on port ' + PORT);

});
