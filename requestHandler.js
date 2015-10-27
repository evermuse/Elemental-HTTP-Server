//define methods in an Enum

var METHODS = {

  GET : "GET",
  POST : "POST",
  PUT : "PUT",
  DELETE : "DELETE"

};


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

      fs.writeFile('public/' + newPage.elementName.toLowerCase() + '.html', buildElementPage(newPage), function(err) {

        //make error

        response.writeHead(200, { 'Content-Type' : 'application/json' });

        response.end(JSON.stringify({ 'success' : true } ));

        fs.writeFile('public/index.html', buildIndexPage(newPage.elementName), function(err) {

          if (err) throw err.message;

        });

      });

    } else if (request.method === 'PUT') {

      fs.readdir('./public', function(err, file) {

        if (err) throw err.message;

        if (urlObj.path) {

          fs.writeFile('public/' + newPage.elementName.toLowerCase() + '.html', buildElementPage(newPage), function(err) {

            response.writeHead(200, { 'Content-Type' : 'application/json' });

            response.end(JSON.stringify({ 'success' : true } ));

          });

        }

      });

    } else if (request.method === 'DELETE') {

      fs.readdir('./public', function(err, file) {

        if (err) throw new Error(err.message);

        file.filter(function(current) {

          if (current === urlObj.path.substr(1)) {

            fs.unlink('./public/' + current, function(err) {

              if (err) throw new Error(err.message);

              response.writeHead(200, { 'Content-Type' : 'application/json' });

              response.end(JSON.stringify({ 'success' : true } ));

              fs.writeFile('public/index.html', buildIndexPage(newPage.elementName, true), function(err) {

                if (err) throw new Error(err.message);

              });

            });

          }

          return true;

        });

      });

    } else {

      //read the files

      fs.readFile('./public' + urlObj.path, function(err, data) {

        if (err) {

          return fs.readFile('./public/404.html', function(err, data) {

            if (err) { return 'The page you wanted can not be located'; }

            response.end(data);

          });

        }

        if (urlObj.path === '/index.html' || urlObj.path === '' ) {

          buildIndexPage();

        }

        response.end(data);

      });

    }

  });

});