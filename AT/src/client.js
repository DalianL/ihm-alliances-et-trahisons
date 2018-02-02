import io from 'socket.io-client';

// let amountPlayers = 1;
let amountPlanets = 0;
let SIOClient = null;

function parser(amount, data) {
  return "{ \"id_planet\": " + amount + ", \"id_player\": " + data.id + " }"; // eslint-disable-line
}

class Client {

  constructor() {
    if (SIOClient !== null) {
      return SIOClient;
    }

    this.socket = io('http://localhost:8000/');

    this.socket.on('create_player', (data) => {
      this.socket.emit('conquer_planet', parser(amountPlanets, data));
      this.socket.emit('add_fleet', parser(amountPlanets, data));
      amountPlanets += 1;
      // amountPlayers += 1;
    });

    // this.socket.on('create_fleet', (data) => {
    //   GameCore.getInstance().addFleet(data.id, data.id_player, data.id_planet);
    // });

    SIOClient = this;
    return SIOClient;
  }

  static getInstance() {
    return new Client();
  }

}

export default Client;
