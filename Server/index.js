var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var users = {};
var players = {};
var userId = 0;

io.on('connection', function(socket) {
  // Initialize player
  users[userId] = {id : socket.id};
  players[userId] = {
    id : userId,
    pseudo : userId,
    color : "color"
  };
  socket.userId = userId++;

  // "Connect" event
  console.log('a user connected, player : ' + players[socket.userId].pseudo);
  console.log('update players');
  socket.emit('update_client', {players});
  socket.broadcast.emit('update_client', {players});

  // "Hello" event, à effacer ?
  socket.on('hello', function(msg){
    console.log('message from ' + players[socket.userId].pseudo + " : " + msg);
    io.emit('hello', {
      id: socket.userId,
      msg: msg
    });
  });

  // "Interact" event
  socket.on('interact', function(message){
    message = JSON.parse(message);
    console.log(players[message.sender].pseudo + ' send \"' + message.msg + '\" to ' + players[message.recipient].pseudo);
    io.to(users[message.recipient].id).emit('interact', {
      sender: message.sender,
      recipient: message.recipient,
      msg: message.msg
    });
  });

  // "Update" event
  socket.on('update', function(msg){
    console.log('updating game info');
    socket.broadcast.emit('update', "ok");
  });

});

http.listen(8000, function(){
  console.log('listening on *:8000');
});