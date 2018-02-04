import io from 'socket.io-client';
import GameCore from './gameCore';
import Utils from './utils';

// let amountPlayers = 1;
let amountPlanets = 0;
let SIOClient = null;

class Client {

  constructor() {
    if (SIOClient !== null) {
      return SIOClient;
    }

    this.socket = io('http://localhost:8000/');

    this.socket.on('create_player', (data) => {
      this.socket.emit('conquer_planet', Utils.parser(amountPlanets, data));
      this.socket.emit('add_fleet', Utils.parser(amountPlanets, data));
      amountPlanets += 1;
      // amountPlayers += 1;
    });

    this.socket.on('create_fleet', (data) => {
      GameCore.getInstance().addSpaceship(data.id, data.id_player, data.id_planet);
    });

    SIOClient = this;
    return SIOClient;
  }

  static getInstance() {
    return new Client();
  }

}

export default Client;
