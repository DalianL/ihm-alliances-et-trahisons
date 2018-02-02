import { WINDOW_WIDTH, WINDOW_HEIGHT } from 'tuiomanager/core/constants';
import MenuItem from 'tuiomanager/widgets/CircularMenu/MenuItem';
import CircularMenuCustom from './circularMenuCustom';
import Drawer from './drawer';
import Player from './player';
import Planet from './planet';
import SpaceshipWidget from './spaceshipWidget';
import Client from './client';

let gameCoreInstance = null;

class GameCore {
  constructor() {
    if (gameCoreInstance !== null) {
      return gameCoreInstance;
    }

    this.players = [];
    this.planets = [];
    this.playerColors = ['blue', 'red', 'yellow', 'green'];
    this.playerImgs = ['assets/image/spaceship1.png', 'assets/image/spaceship2.png', 'assets/image/spaceship3.png', 'assets/image/spaceship4.png'];
    this.drawer = new Drawer(WINDOW_WIDTH, WINDOW_HEIGHT, this);
    this.client = new Client();

    gameCoreInstance = this;
    return gameCoreInstance;
  }

  static getInstance() {
    return new GameCore();
  }

  addMenu() {
    const root = new MenuItem('root', '#0F0', '#0FF', false);

    const attack = new MenuItem('Attack', '#FFF', '#000', false);
    attack.setTouchCallback(() => {
      // console.log('Created spaceship');
    });
    root.addChild(attack);

    // const target = new MenuItem('Target', '#FFF', '#000', false);
    // target.setTouchCallback(() => {
    //   // console.log('Target planet now');
    // });
    // root.addChild(target);

    this.menu = new CircularMenuCustom(0, root);
    this.menu.addTo('#example-container');
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

  addPlanet(planetId, playerId, x, y, size) {
    let newPlanet;
    if (playerId > 0) {
      newPlanet = new Planet(planetId, playerId, x, y, size, '', this.playerColors[playerId - 1], this.playerColors[playerId - 1], false, ['SpaceshipWidget']);
      this.players[playerId - 1].addPlanet(newPlanet);
    } else {
      newPlanet = new Planet(planetId, playerId, x, y, size, '', 'white', 'white', false, ['SpaceshipWidget']);
    }

    this.planets.push(newPlanet);
    newPlanet.addTo('#example-container');
  }

  addFleet() { // id, playerId, planetId) {
    if (this.player !== undefined) {
      // console.log(id, playerId, planetId);
    }
  }
}

export default GameCore;
