var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var url = require('url');

var requestHandler = require('/requestHandler');

//template module to format the JSON POST data into a newly formatted page

var buildElementPage = require('./templates/newElement');
var buildIndexPage = require('./templates/index');

//declare the port

var PORT = 3000;



//iterate over file directory and pull element names

function init(){

  fs.readdir('./public', function(err, files) {
    if(err) throw err;
    elements = files.filter(function(file) {
      return (file.indexOf('.html') > 1 && file !== 'index.html' && file !== '404.html');
    }).map(function(elementName) {
      return (elementName.substr(0,elementName.indexOf('.html')));
    }).map(function(lowerCase) {
      return (lowerCase.substr(0,1).toUpperCase() + lowerCase.substr(1));
    });
    //calls function that creates dynamic list with element names from directory
    writeIndex(elements);
  });

}


//create server and listen

http.createServer.(requestHandler).listen(PORT, function() {

  console.log('server listening on port ' + PORT);

});







function handleGET(req, res) {

  //handle routing  //could handle cases with another switch (i.e. users/ & articles/ etc)

  if (req.url === '/') {

    fs.readfile('./public');

  }

  switch(req.url)

  res.end(req.url);

}

function handlePOST(req, res) {

  if (req.url === '/elements') {


  } else {

  res.setHeader({ 'status', '401'});
  res.end('you are not allowed to do that');

}

function handlePUT(req, res) {

  res.end(req.url);

}

function handleDELETE(req, res) {

  res.end(req.url);

}

module.exports = function(req, res) {

  switch(req.method) {

    case METHODS.GET: handleGET(req, res); break;
    case METHODS.GET: handlePOST(req, res); break;
    case METHODS.GET: handlePUT(req, res); break;
    case METHODS.GET: handleDELETE(req, res); break;
    default handleInvalidMethod(req, res);

  }


}










