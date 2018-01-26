var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var colors = ["RED", "YELLOW", "BLUE", "GREEN", "ORANGE", "VIOLET"];
var species = ["WOOKIES", "JAWAS", "GUNGANS", "EWOKS"];
var resources = ["RED_CRYSTAL_KYBER", "GREEN_CRYSTAL_KYBER", "BLUE_CRYSTAL_KYBER", "VIOLET_CRYSTAL_KYBER"];
var users = [];
var players = [];
var fleets = [];
var planets = [];

var userId = 0;
var fleetId = 0;
var planetId = 0;

io.on('connection', function(socket) {
  // Adress of user
  users[userId] = {id : socket.id};

  // Player
  players.push({
    id: userId,
    pseudo: userId,
    specie: userId % 4,
    color: userId % 6,
    resources: [1,1,1,1]
  });
  socket.userId = userId++;

  function test() {
    console.log('sending');
    return {userId: socket.userId};
  }

  // "Connect" event
  console.log('a user connected, Player n°: ' + socket.userId);
  socket.emit('connected', test());
  console.log('Connected do  to Player n° ' + socket.userId);
  // "Connected" event
  socket.on('connected', function(message){
    message = JSON.parse(message);
    console.log(message.Pseudo + ' is pseudo of Player n°' + message.Id);
    // Move fleet
    for(var i = 0; i < players.length; i++) {
        if(players[i].id == message.Id) {
            players[i].pseudo = message.Pseudo;
        }
    }
    // Update
    update_client();
  });

  socket.on('disconnect', function(message){
      console.log('');
  });

  // "Interact" event
  socket.on('interact', function(message){
    message = JSON.parse(message);
    console.log('Send \"' + message.msg + '\" form Player n°' + message.sender + ' to Player n°' + message.recipient);
    io.to(users[message.recipient].id).emit('interact', {
      sender: message.sender,
      recipient: message.recipient,
      msg: message.msg
    });
  });

  // "Add_fleet" event
  // Ex : socket.Emit ("add_fleet", "{\"id_planet\": 0, \"id_player\": 0}");
  socket.on('add_fleet', function(message){
    message = JSON.parse(message);
    console.log('Add a fleet to Player n°' + message.id_player);
    // Add fleet
    fleets.push({
      id: fleetId,
      name: fleetId,
      id_planet : message.id_planet,
      id_player : message.id_player
    });
    fleetId++;
    // Update
    update_client();
  });

  // "Move_fleet" event
  // Ex : socket.Emit ("move_fleet", "{\"id_fleet\": 0, \"id_planet\": 1}");
  socket.on('move_fleet', function(message){
    message = JSON.parse(message);
    console.log('Move a fleet');
    // Move fleet
    for(var i = 0; i < fleets.length; i++) {
        if(fleets[i].id == message.id_fleet) {
            fleets[i].id_planet = message.id_planet;
        }
    }
    // Update
    update_client();
  });

  // "Remove_fleet" event
  socket.on('remove_fleet', function(message){
    message = JSON.parse(message);
    console.log('Remove a fleet to Player n°' + message.id_player);
    // Remove fleet
    for(var i = 0; i < fleets.length; i++) {
        if(fleets[i].id == message.id_fleet) {
            fleets.splice(i, i + 1);
        }
    }
    // Update
    update_client();
  });

  // "Add_planet" event
  // Ex : socket.Emit ("add_planet", "{}");
  socket.on('add_planet', function(message){
    message = JSON.parse(message);
    console.log('Add a planet');
    // Add planet
    planets.push({
      id: planetId,
      name: planetId,
      id_player : -1,
      resources: [
        Math.floor(Math.random() * 4),
        Math.floor(Math.random() * 4),
        Math.floor(Math.random() * 4),
        Math.floor(Math.random() * 4)
      ]
    });
    planetId++;
    // Update
    update_client();
  });

  // "Conquer_planet" event
  // Ex : socket.Emit ("conquer_planet", "{\"id_planet\": 0, \"id_player\": 0}");
  socket.on('conquer_planet', function(message){
    message = JSON.parse(message);
    console.log('Conquer a planet for Player n°' + socket.userId);
    // Remove planet
    for(var i = 0; i < planets.length; i++) {
        if(planets[i].id == message.id_planet) {
            planets[i].id_player = message.id_player;
                 }
    }
    // Update
    update_client();
  });

  // "Remove_planet" event
  socket.on('remove_planet', function(message){
    message = JSON.parse(message);
    console.log('Remove a planet');
    // Remove planet
    for(var i = 0; i < planets.length; i++) {
        if(planets[i].id == message.id_planet) {
            planets.splice(i, i + 1);
        }
    }
    // Update
    update_client();
  });

  // "Update" event
  socket.on('update', function(msg){
    console.log('updating game info');
    socket.broadcast.emit('update', "ok");
  });

  function update_client() {
      for(var i = 0; i < users.length; i++) {
          io.to(users[i].id).emit('update_client', {
              players: players,
              fleets: fleets,
              planets: planets,
              userId: i
          });
      }
  };

});

http.listen(8000, function(){
  console.log('listening on *:8000');
});