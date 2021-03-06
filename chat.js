// Default Modules from nodeJS, etc
var http  = require('http');
//this is connection server listen on port
var server = http.createServer(function(request, response){
  console.log('Server NodeJS created.');
}).listen(9900, function(){
  console.log('listening on *:9900');
});

// Make the server into Socket IO enabled
var io = require('socket.io').listen(server);

// When there is a user that is connected
io.on('connection', function(socket){

  // Get data from CLIENT and send back data to ONLY that client
  socket.on('giveUserComputerData', function(user_browser_user_agent){
    console.log('user connected! ' + ' the session ID is: ' + socket.id + ' the user browser is ' + user_browser_user_agent);
    io.to(socket.id).emit('giveUserHisBrowserAgent', 'You are ' + user_browser_user_agent);
  });

  // User disconnected
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  // Get data from CLIENT
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    // Send data to ALL CLIENT
    io.emit('chat message', msg);
  });


});
