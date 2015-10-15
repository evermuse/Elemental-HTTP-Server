//require filesystem

var fs = require('fs');

//initialize element array

var elements = null;

fs.readdir('./public', function(err, files) {

  if (err) throw err.message;

  elements = files.filter(function(file) {

    return file.indexOf('.html') > 1 &&
      file !== '404.html' &&
      file !== 'index.html';

  }).map(function(elementFileName) {

    return elementFileName.substr(0, elementFileName.indexOf('.html'));

  }).map(function(lowerCasedElementName) {

    return lowerCasedElementName.substr(0, 1).toUpperCase() + lowerCasedElementName.substr(1);

  });

});

//element list is rendered from array

function renderList() {

  return elements.map(function(element) {

    //populate filepath and elementName dynamically

    return '<li><a href="{{ filePath }}">{{ elementName }}</a></li>'.replace('{{ filePath }}', element.toLowerCase() + '.html').replace('{{ elementName }}', element);

  }).join('\n');

}

var buildIndexPage = function buildIndexPage(elementName) {

  if (elementName) {

    elements.push(elementName);

  }

  return '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <title>The Elements</title> <link rel="stylesheet" href="/css/styles.css"> </head> <body> <h1>The Elements</h1> <h2>These are all the known elements.</h2> <h3>These are ' + elements.length + '</h3> <ol>' + renderList() + ' </ol> </body> </html>';

};

//export buildIndexPage function and elements array

module.exports = buildIndexPage;
