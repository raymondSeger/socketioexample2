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

var users_connected_user_agents = [];

// When there is a user that is connected
io.on('connection', function(socket){

  // Get data from CLIENT and send back data to ONLY that client
  socket.on('giveUserComputerData', function(user_browser_user_agent) {
    // Storing the user data to the array, the key is the user's session
    users_connected_user_agents[socket.id] = user_browser_user_agent;
    console.log('DEBUG, current array content is: '); // DEBUG
    console.log(users_connected_user_agents); // DEBUG
    
    console.log('user connected! ' + ' the session ID is: ' + socket.id + ' the user browser is ' + user_browser_user_agent);
    io.to(socket.id).emit('giveUserHisBrowserAgent', user_browser_user_agent);
  });

  // User disconnected
  socket.on('disconnect', function(){
    console.log('user with ID of ' + socket.id + ' is disconnected, his browser is ' + users_connected_user_agents[socket.id]);
    // Send data to ALL CLIENT
    io.emit('user disconnected', socket.id, users_connected_user_agents[socket.id]);
    delete users_connected_user_agents[socket.id];
    console.log('DEBUG, current array content is: '); // DEBUG
    console.log(users_connected_user_agents); // DEBUG
  });

  // Get data from CLIENT
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    // Send data to ALL CLIENT
    io.emit('chat message', msg);
  });


});
