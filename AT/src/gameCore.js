import { WINDOW_WIDTH, WINDOW_HEIGHT } from 'tuiomanager/core/constants';
import Player from './player';
import SpaceshipWidget from './spaceshipWidget';
import Drawer from './drawer';
import Planet from './planet';

class GameCore {
  constructor() {
    this.players = [];
    this.planets = [];
    this.playerColors = ['blue', 'red', 'yellow', 'green'];
    this.playerImgs = ['assets/image/spaceship1.png', 'assets/image/spaceship2.png', 'assets/image/spaceship3.png', 'assets/image/spaceship4.png'];
    this.drawer = new Drawer(WINDOW_WIDTH, WINDOW_HEIGHT, this);
  }

  initMap() {
    this.drawer.prepareDrawer('assets/image/background.jpg');
  }

  createPlayer(id) {
    this.players.push(new Player(id, this.playerColors[id - 1]));
  }

  addSpaceship(playerId, x, y) {
    const newSpaceship = new SpaceshipWidget(playerId, x, y, 45, 45, 0, this.playerColors[playerId - 1], this.playerImgs[playerId - 1], this.drawer, playerId - 1);
    this.players[playerId - 1].addSpaceship(newSpaceship);
    newSpaceship.addTo('#example-container');
  }

  addPlanet(playerId, planetId, x, y, size) {
    let newPlanet;
    if (playerId > 0) {
      newPlanet = new Planet(planetId, x, y, size, '', this.playerColors[playerId - 1], this.playerColors[playerId - 1], false, ['SpaceshipWidget']);
      this.players[playerId - 1].addPlanet(newPlanet);
    } else {
      newPlanet = new Planet(planetId, x, y, size, '', 'white', 'white', false, ['SpaceshipWidget']);
    }

    this.planets.push(newPlanet);
    newPlanet.addTo('#example-container');
  }
}

export default GameCore;
