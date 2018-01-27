import io from 'socket.io-client';

let amountPlayers = 1;
let amountPlanets = 0;
let SIOClient = null;

function parser(amount, data) {
  return "{ \"id_planet\": " + amount + ", \"id_player\": " + (data.players.length - 1) + " }"; // eslint-disable-line
}

class Client {

  constructor() {
    if (SIOClient !== null) {
      return SIOClient;
    }

    this.socket = io('http://localhost:8000/');
    this.socket.on('update_client', (data) => {
      if (data.players.length > amountPlayers) {
        amountPlayers += 1;

        this.socket.emit('conquer_planet', parser(amountPlanets, data));
        amountPlanets += 1;
        this.socket.emit('conquer_planet', parser(amountPlanets, data));
        amountPlanets += 1;
        this.socket.emit('conquer_planet', parser(amountPlanets, data));
        // Adds a fleet on the last planet
        this.socket.emit('add_fleet', parser(amountPlanets, data));
        amountPlanets += 1;
      }
    });

    SIOClient = this;
    return SIOClient;
  }

  static getInstance() {
    return new Client();
  }

}

export default Client;
