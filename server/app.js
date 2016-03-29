//Lets require/import the HTTP module
var http = require('http');

//Lets define a port we want to listen to
const PORT=8080;


var commands = [];

function handlejson(json) {

}

//We need a function which handles requests and send response
function handleRequest(request, response){


  if(request.method === "POST") {
    if (request.url === "/") {

      response.writeHead(200, {'Content-Type': 'text/html'});

      // result =  handlejson(json);

//    draw response
      response.end("JSON REÇU" + request);

    //  handlejson(json);
      // verify last remaining time
      // if the angle is not ok try to correct —> final step
      // determine where is the car on the map
      // draw the map
      // define target destination
      // set direction
      // store commands

    }
  }
  else {
    response.end('Incorrect Request' + request.url);
  }
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
    //
})
