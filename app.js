import http from 'http';
import 'dotenv/config';

const port = process.env.PORT || 3000;

console.log(`Trying to run app on port ${port}`);

http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end("Hier gibt es immer noch nichts zu sehen, bitte gehen Sie weiter ... Version 13 \n");
}).listen(port);

console.log(`App is running... (port: ${port})`);
