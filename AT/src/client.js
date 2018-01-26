import io from 'socket.io-client';

let SIOClient = null;

class Client {

  constructor() {
    if (SIOClient !== null) {
      return SIOClient;
    }

    this.socket = io('http://localhost:8000/');
    SIOClient = this;
    return SIOClient;
  }

  static getInstance() {
    return new Client();
  }

}

export default Client;
