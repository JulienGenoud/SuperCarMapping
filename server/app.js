//Lets require/import the HTTP module
var http = require('http');

var express = require('express');
var bodyParser = require('body-parser')
var app = express()
var jsonParser = bodyParser.json()



var commands = ''

function getpostion() {
  // this function should return actual position
  return ("b4");
};

function getnextpostion() {
  // this function should return actual position
  return ("c6");
};

function getlastorder() {

  var rotation = 100;
  var direction = 1;
  var time = 1000;
  var order = 2;

  return   '{"rotation" :"' + rotation+ '","direction" : "' +direction + '","time" : "' + time+ '", "order" : "' + order + '"}';

}

app.get('/', function (req, res) {
  var form = '<form><br><b>Sent command</b><br>rotation:<br><input type="text" name="rotation"><br>direction:<br><input type="text" name="direction"><br>time:<br><input type="text" name="time"><br><br> <input type="submit" value="Submit"></form><br>';

  if (commands != '')
    res.send(form + '<table border="1"><tr><td>show last commands</td><td>show car actual postion</td><td>show car next postion</td></tr>'+ commands + '</table><br>');
  else {
    res.send("please broacast information<br>" + form);
  }
});


app.get('/commands', function (req, res) {
  res.send(commands);
});


app.get('/order', function (req, res) {
  res.send(getlastorder());
});

app.post('/data', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  commands += '<tr><td>nReceived distance : ' + req.body.distance + " degrees : " + req.body.degrees + "</td><td>" + getpostion() + "</td><td>" + getnextpostion() + "</td></tr>";
  // process all the data

  res.send('distance : ' + req.body.distance + " degrees : " + req.body.degrees + " order : " + req.body.order );

  console.log('\nReceived \ndistance : ' + req.body.distance + "\ndegrees : " + req.body.degrees + "\norder : " + req.body.order);

})

app.post('/user', function (req, res) {
  res.send('Got a POST request user' + req.body);
});

app.listen(3000, function () {
  console.log('Car Mapping listening on port 3000!');
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
