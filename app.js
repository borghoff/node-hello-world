const http = require('http');

const port = process.env.PORT || 3000;

http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end("Hier gibt es immer noch nichts zu sehen, bitte gehen Sie weiter ...\n");
}).listen(port);

console.log(`App is running... (port: ${port})`);
