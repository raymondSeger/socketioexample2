// Default Modules from nodeJS, etc
var http  = require('http');

// My variables
var billyJSONObject = {'name': 'billy'};
var usernames = {};
var numUsers = 0;

var server = http.createServer(function(request, response){
  console.log('Server NodeJS created.');
}).listen(9900, function(){
  console.log('listening on *:9900');
});

// Make the server into Socket IO enabled
var io = require('socket.io').listen(server);

// When there is a user that is connected
io.on('connection', function(socket){

  console.log('user connected!');

  // Send the user the JSON object
  io.emit('giveData', billyJSONObject);

  // Get data from CLIENT
  socket.on('giveUserComputerData', function(user_browser_user_agent){
    console.log('I am: ' + user_browser_user_agent);
    // Send data to CLIENT
    // io.emit('giveUserComputerData', user_browser_user_agent);
  })

  // Get data from CLIENT
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  // Get data from CLIENT
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    // Send data to CLIENT
    io.emit('chat message', msg);
  });


});
