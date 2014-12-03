//this is comment
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

  if (io.sockets.connected[socket.id]) {
      io.sockets.connected[socket.id].emit('msg', 'for your eyes only');
  }

  // Send the user the JSON object
  io.emit('giveData', billyJSONObject);

  // Get data from CLIENT
  socket.on('giveUserComputerData', function(user_browser_user_agent){
    console.log(user_browser_user_agent + ' is here');

    io.to(socket.id).emit('msgs', 'You are ' + user_browser_user_agent);

    //if (io.sockets.connected[socketid]) {
    //io.sockets.connected[socketid].emit('message', 'for your eyes only');

    // Send data to CLIENT
    //io.emit('giveUserComputerData', user_browser_user_agent);

  });

  // User disconnected
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
