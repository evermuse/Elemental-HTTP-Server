var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var url = require('url');

var PORT = 3000;

//will serve html and css content that is stored on the file system

var server = http.createServer(function(request, response) {

  var dataBuffer = '';

  request.on('data', function(data) {

    dataBuffer += data;

  });

  request.on('end', function() {

    var urlObj = url.parse(request.url);

    var newPage = qs.parse(dataBuffer.toString());

    console.log('the new page info is right here', newPage);

    //console.log('the url path is right here', urlObj);

    if (urlObj.path === '/elements' && request.method === 'POST' ) {

      fs.writeFile('public/' + newPage.elementName.toLowerCase() + '.html', newPage, function(err) {



      });

    } else {

      fs.readFile('./public' + urlObj.path, function(err, data) {

        //if (err) throw new Error('could not find request page');

        response.end(data);

      });

    }

  });

});

server.listen(PORT, function() {

  console.log('server listening on port ' + PORT);

});

// var data = qs.parse( dataBuffer.toString());
//     console.log(data);