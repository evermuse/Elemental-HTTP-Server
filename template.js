function buildPage(newPage) {

  return '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <title>The Elements - Helium</title> <link rel="stylesheet" href="/css/styles.css"> </head> <body> <h1>' + newPage.elementName + '</h1> <h2>' + newPage.elementSymbol + '</h2> <h3>' + newPage.elementAtomicNumber + '</h3> <p>' + newPage.elementDescription + '</p> <p><a href="/">back</a></p> </body> </html>';

}

module.exports = buildPage;