var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var userId = 0;
io.on('connection', function(socket) {
  socket.userId = userId ++;
  console.log('a user connected, user id: ' + socket.userId);

  socket.on('hello', function(msg){
    console.log('message from user#' + socket.userId + ": " + msg);
    io.emit('hello', {
      id: socket.userId,
      msg: msg
    });
  });

  socket.on('update', function(msg){
    console.log('updating game info');
  });

});

http.listen(8000, function(){
  console.log('listening on *:8000');
});