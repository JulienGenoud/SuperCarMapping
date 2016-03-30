//Lets require/import the HTTP module
var http = require('http');

var express = require('express');
var bodyParser = require('body-parser')
var app = express()


var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// parse application/x-www-form-urlencoded


app.use(function(req, res, next) {
  req.rawBody = '';
  req.setEncoding('utf8');
  req.on('data', function(chunk) {
    req.rawBody += chunk;
  });
  req.on('end', function() {
    next();
  });
});
app.use(bodyParser());


app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.post('/users', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  res.send('Got a POST  USER request' + req.rawBody);

  // create user in req.body
})

app.post('/', function (req, res) {

  res.send('Got a POST request' + req.body);
});

app.post('/user', function (req, res) {

  res.send('Got a POST request user' + req.body);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// //We need a function which handles requests and send response
// function handleRequest(request, response){
//
//
//   if(request.method === "POST") {
//     if (request.url === "/") {
//
//       response.writeHead(200, {'Content-Type': 'text/html'});
//
//       // result =  handlejson(json);
//
// //    draw response
//       response.end("JSON received" + request);
//
//     //  handlejson(json);
//       // verify last remaining time
//       // if the angle is not ok try to correct —> final step
//       // determine where is the car on the map
//       // draw the map
//       // define target destination
//       // set direction
//       // store commands
//
//     }
//   }
//   else {
//     response.end('Incorrect Request' + request.url);
//   }
// }
//
// //Create a server
// var server = http.createServer(handleRequest);
//
// //Lets start our server
// server.listen(PORT, function(){
//     //Callback triggered when server is successfully listening. Hurray!
//     console.log("Server listening on: http://localhost:%s", PORT);
//     //
// })
