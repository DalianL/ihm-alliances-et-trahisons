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
    this.menus = [];
    this.playerColors = ['red', 'green', 'blue', 'orange'];
    this.playerTags = ['77', '87', '97', '51'];
    this.playerImgs = ['assets/image/spaceship1.png', 'assets/image/spaceship2.png', 'assets/image/spaceship3.png', 'assets/image/spaceship4.png'];
    this.drawer = new Drawer(WINDOW_WIDTH, WINDOW_HEIGHT, this);
    this.client = new Client();
    this.gameStarted = false;

    gameCoreInstance = this;
    return gameCoreInstance;
  }

  static getInstance() {
    return new GameCore();
  }

  initMap() {
    this.drawer.prepareDrawer('assets/image/background.png');
  }

  initPlayers() {
    this.createPlayer(1, this.playerTags[0]);
    this.addFirstSpaceships(0, 1, 1, 230, 185);

    this.createPlayer(2, this.playerTags[1]);
    this.addFirstSpaceships(1, 2, 2, 770, 102);

    this.createPlayer(3, this.playerTags[2]);
    this.addFirstSpaceships(2, 3, 3, 500, 810);

    this.createPlayer(4, this.playerTags[3]);
    this.addFirstSpaceships(3, 4, 4, 1225, 209);
  }

  createPlayer(id, tagId) {
    this.players.push(new Player(id, this.playerColors[id - 1], tagId));
  }

  initFirstPlanets() {
    for (let i = 0; i < 16; i += 1) {
      this.client.socket.emit('add_planet', '{}');
    }
  }

  initPlanets() {
    this.addPlanet(1, 1, 228, 186, 95);
    this.addPlanet(2, 2, 768, 102, 135);
    this.addPlanet(3, 3, 498, 812, 110);
    this.addPlanet(4, 4, 1225, 209, 110);
    this.addPlanet(5, -1, 1710, 807, 100);
    this.addPlanet(6, -1, 930, 822, 220);
    this.addPlanet(7, -1, 12, 27, 90);
    this.addPlanet(8, -1, 234, 510, 65);
    this.addPlanet(9, -1, -120, 830, 310);
    this.addPlanet(10, -1, 1310, 615, 120);
    this.addPlanet(11, -1, 658, 385, 95);
    this.addPlanet(12, -1, 1189, -20, 110);
    this.addPlanet(13, -1, 1489, 86, 85);
    this.addPlanet(14, -1, 1520, 476, 70);
    this.addPlanet(15, -1, 1634, 228, 135);
    this.addPlanet(16, -1, 1744, 82, 60);
  }

  addFirstSpaceships(id, playerId, planetId, x, y) {
    const newSpaceship = new SpaceshipWidget(id, playerId, planetId, x, y, 45, 45, 0, this.playerColors[playerId - 1], this.playerImgs[playerId - 1], this.drawer);
    this.players[playerId - 1].addSpaceship(newSpaceship);
    newSpaceship.addTo('#example-container');
  }

  addSpaceship(id, playerId, planetId) {
    if (this.gameStarted) {
      const correctId = planetId > 3 ? planetId - 1 : planetId;
      const newSpaceship = new SpaceshipWidget(3 + id, playerId, correctId, this.planets[correctId].x, this.planets[correctId].y, 45, 45, 0, this.playerColors[playerId - 1], this.playerImgs[playerId - 1], this.drawer); // eslint-disable-line
      this.players[playerId - 1].addSpaceship(newSpaceship);
      newSpaceship.addTo('#example-container');
    }
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

  startGame() {
    setTimeout(() => {
      this.gameStarted = true;
    }, 5000);
  }

  conquerFirstPlanet(id) {
    this.planets[id - 1].stackDiv.css('border', `solid 10px ${this.playerColors[id - 1]}`);
    this.planets[id - 1].playerId = id;
  }

  addMenus() {
    const root1 = new MenuItem('root1', '#0F0', '#0FF', false);

    const attack1 = new MenuItem('Attack', '#FFF', '#000', false);
    attack1.setTouchCallback(() => {
      // console.log('Action taken', this.gameStarted);
    });
    root1.addChild(attack1);

    const defend1 = new MenuItem('Defend', '#FFF', '#000', false);
    defend1.setTouchCallback(() => {
      // console.log('Action taken', this.gameStarted);
    });
    root1.addChild(defend1);

    const move1 = new MenuItem('Move', '#FFF', '#000', false);
    move1.setTouchCallback(() => {
      // console.log('Action taken', this.gameStarted);
    });
    root1.addChild(move1);

    const menu1 = new CircularMenuCustom(root1, this.playerTags[0]);
    menu1.addTo('#example-container');
    this.menus.push(menu1);

    // SECOND MENU
    const root2 = new MenuItem('root2', '#0F0', '#0FF', false);

    const attack2 = new MenuItem('Attack', '#FFF', '#000', false);
    attack2.setTouchCallback(() => {
      // console.log('Created spaceship');
    });
    root2.addChild(attack2);

    const defend2 = new MenuItem('Defend', '#FFF', '#000', false);
    defend2.setTouchCallback(() => {
      // console.log('Action taken', this.gameStarted);
    });
    root2.addChild(defend2);

    const move2 = new MenuItem('Move', '#FFF', '#000', false);
    move2.setTouchCallback(() => {
      // console.log('Action taken', this.gameStarted);
    });
    root2.addChild(move2);

    const menu2 = new CircularMenuCustom(root2, this.playerTags[1]);
    menu2.addTo('#example-container');
    this.menus.push(menu2);

    // THIRD MENU
    const root3 = new MenuItem('root3', '#0F0', '#0FF', false);

    const attack3 = new MenuItem('Attack', '#FFF', '#000', false);
    attack3.setTouchCallback(() => {
      // console.log('Created spaceship');
    });
    root3.addChild(attack3);

    const defend3 = new MenuItem('Defend', '#FFF', '#000', false);
    defend3.setTouchCallback(() => {
      // console.log('Action taken', this.gameStarted);
    });
    root3.addChild(defend3);

    const move3 = new MenuItem('Move', '#FFF', '#000', false);
    move3.setTouchCallback(() => {
      // console.log('Action taken', this.gameStarted);
    });
    root3.addChild(move3);

    const menu3 = new CircularMenuCustom(root3, this.playerTags[2]);
    menu3.addTo('#example-container');
    this.menus.push(menu3);

    // FOURTH MENU
    const root4 = new MenuItem('root4', '#0F0', '#0FF', false);

    const attack4 = new MenuItem('Attack', '#FFF', '#000', false);
    attack4.setTouchCallback(() => {
      // console.log('Created spaceship');
    });
    root4.addChild(attack4);

    const defend4 = new MenuItem('Defend', '#FFF', '#000', false);
    defend4.setTouchCallback(() => {
      // console.log('Action taken', this.gameStarted);
    });
    root4.addChild(defend4);

    const move4 = new MenuItem('Move', '#FFF', '#000', false);
    move4.setTouchCallback(() => {
      // console.log('Action taken', this.gameStarted);
    });
    root4.addChild(move4);

    const menu4 = new CircularMenuCustom(root4, this.playerTags[3]);
    menu4.addTo('#example-container');
    this.menus.push(menu4);
  }
}

export default GameCore;
