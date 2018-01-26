import io from 'socket.io-client';

let amountPlayers = 1;
let amountPlanets = 0;
let SIOClient = null;

class Client {

  constructor() {
    if (SIOClient !== null) {
      return SIOClient;
    }

    this.socket = io('http://localhost:8000/');
    this.socket.on('update_client', (data) => {
      console.log('Updating data for all players'); // eslint-disable-line
      if (data.players.length > amountPlayers) {
        amountPlayers += 1;

        this.socket.emit('conquer_planet', this.parser(amountPlanets, data));
        amountPlanets += 1;
        this.socket.emit('conquer_planet', this.parser(amountPlanets, data));
        amountPlanets += 1;
        this.socket.emit('conquer_planet', this.parser(amountPlanets, data));
        this.socket.emit('add_fleet', this.parser(amountPlanets, data));
        amountPlanets += 1;
      }
    });

    SIOClient = this;
    return SIOClient;
  }

  static getInstance() {
    return new Client();
  }

  parser(amount, data) {
    return "{ \"id_planet\": " + amount + ", \"id_player\": " + (data.players.length - 1) + " }"; // eslint-disable-line
  }

}

export default Client;
