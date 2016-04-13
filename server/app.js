var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var COMMENTS_FILE = path.join(__dirname, 'commands.json');

app.set('port', (process.env.PORT || 3000));

app.use('/site', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/', function(req, res) {
  console.log('\napi  get requested \n' +  new Date().toString());

  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.send(JSON.parse(data).slice(-1)[0].order);
  });
});


app.get('/api/command', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.send(JSON.parse(data).slice(-1)[0]);
  });
});


app.get('/api/commands', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/commands', function(req, res) {

console.log('\napi  post requested \n' +  new Date().toString());

 var dis;
 var deg;
 var ord;


  if (req.body.distance == null || req.body.degree == null) {
    if (req.body.order == null) {
      res.json("distance or degree need to be set");
      return (0);
    }
    else {
      dis = "fakecommand";
      deg = "fakecommand";
      ord = req.body.order;
    }
  } else {
    dis = req.body.distance;
    deg = req.body.degree;
    ord = JSON.parse(getlastorder());
  }

  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    var command = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newCommand = {
      id: Date.now(),
      distance: dis,
      degree: deg,
      order : ord
    };
    command.push(newCommand);
    fs.writeFile(COMMENTS_FILE, JSON.stringify(command, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(command);
    });
  });
});


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

// app.get('/', function (req, res) {
//   var form = '<form><br><b>Sent command</b><br>rotation:<br><input type="text" name="rotation"><br>direction:<br><input type="text" name="direction"><br>time:<br><input type="text" name="time"><br><br> <input type="submit" value="Submit"></form><br>';
//
//   if (commands != '')
//     res.send(form + '<table border="1"><tr><td>show last commands</td><td>show car actual postion</td><td>show car next postion</td></tr>'+ commands + '</table><br>');
//   else {
//     res.send("please broacast information<br>" + form);
//   }
// });


// app.get('/commands', function (req, res) {
//   res.send(commands);
// });
//
//
// app.get('/order', function (req, res) {
//   res.send(getlastorder());
// });
//
app.post('/data', bodyParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  commands += '<tr><td>nReceived distance : ' + req.body.distance + " degree : " + req.body.degree + "</td><td>" + getpostion() + "</td><td>" + getnextpostion() + "</td></tr>";
  // process all the data

  res.send('distance : ' + req.body.distance + " degree : " + req.body.degree + " order : " + req.body.order );

  console.log('\nReceived \ndistance : ' + req.body.distance + "\degree : " + req.body.degree + "\norder : " + req.body.order);

})


function getpostion() {
  // this function should return actual position
  return ("b4");
};

function getnextpostion() {
  // this function should return actual position
  return ("c6");
};

function getlastorder(distance, degree) {

  // Calc rotation, direction, time with distance and degree output
  var rotation = 100;
  var direction = 1;
  var time = 1000;
  var order = 2;
    return   '{"rotation" :"' + rotation+ '","direction" : "' +direction + '","time" : "' + time+ '", "order" : "' + order + '"}';
}
//
// app.post('/user', function (req, res) {
//   res.send('Got a POST request user' + req.body);
// });
//
// app.listen(3000, function () {
//   console.log('Car Mapping listening on port 3000!');
// });
