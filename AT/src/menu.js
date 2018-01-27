/**
 * @author Loïc Dalian
 * @author Matthieu Barzellino
 */

// Import JQuery
import $ from 'jquery/dist/jquery.min';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from 'tuiomanager/core/constants';
import QRCode from 'qrcode';
import SpaceshipWidget from './spaceshipWidget';
import Drawer from './drawer';
import Planet from './planet';

// Import ImageWidget
// import VideoElementWidget from 'tuiomanager/widgets/ElementWidget/VideoElementWidget/VideoElementWidget';
// import LibraryBar from 'tuiomanager/widgets/Library/LibraryBar/LibraryBar';
// import CircularMenu from 'tuiomanager/widgets/CircularMenu/CircularMenu';
// import MenuItem from 'tuiomanager/widgets/CircularMenu/MenuItem';
// import { buildNoobWork } from './dev-test';

let widgets = [];

function addWidgetToScreen(widget) {
//  $('#example-container').append(widget.domElem);
  widget.addTo('#example-container');
  widgets.push(widget);
}// AddWidgetToScreen()

function removeWidgets() {
  $('#example-container').empty();
  for (let i = 0; i < widgets.length; i += 1) {
    widgets[i].deleteWidget();
  }
  widgets = [];
}

function initPlanets() {
  const planet1 = new Planet(1, 10, 23, 90, '', 'blue', 'blue', false, ['ImageElementWidget']);
  addWidgetToScreen(planet1);

  const planet2 = new Planet(2, 766, 98, 135, '', 'red', 'red', false, ['ImageElementWidget']);
  addWidgetToScreen(planet2);

  const planet3 = new Planet(3, 658, 385, 95, '', 'red', 'red', false, ['ImageElementWidget']);
  addWidgetToScreen(planet3);

  const planet4 = new Planet(4, 1225, 209, 110, '', 'green', 'green', false, ['ImageElementWidget']);
  addWidgetToScreen(planet4);

  const planet5 = new Planet(5, 930, 820, 220, '', 'yellow', 'yellow', false, ['ImageElementWidget']);
  addWidgetToScreen(planet5);

  const planet6 = new Planet(6, 500, 810, 110, '', 'yellow', 'yellow', false, ['ImageElementWidget']);
  addWidgetToScreen(planet6);

  const planet7 = new Planet(7, 1710, 807, 100, '', 'blue', 'blue', false, ['ImageElementWidget']);
  addWidgetToScreen(planet7);

  const planet8 = new Planet(8, -120, 830, 310, '', 'blue', 'blue', false, ['ImageElementWidget']);
  addWidgetToScreen(planet8);

  const planet9 = new Planet(9, 235, 510, 62, '', 'blue', 'blue', false, ['ImageElementWidget']);
  addWidgetToScreen(planet9);

  const planet10 = new Planet(10, 1280, 590, 180, '', 'blue', 'blue', false, ['ImageElementWidget']);
  addWidgetToScreen(planet10);
}

function initPlayers(drawer) {
  const spaceWidget1 = new SpaceshipWidget(1, 265, 220, 300, 300, 0, 0.15, 'assets/image/spaceship1.png', drawer, 0);
  addWidgetToScreen(spaceWidget1);

  const spaceWidget2 = new SpaceshipWidget(2, 825, 160, 300, 300, 0, 0.15, 'assets/image/spaceship2.png', drawer, 1);
  addWidgetToScreen(spaceWidget2);

  const spaceWidget3 = new SpaceshipWidget(3, 545, 850, 300, 300, 0, 0.15, 'assets/image/spaceship3.png', drawer, 2);
  addWidgetToScreen(spaceWidget3);

  const spaceWidget4 = new SpaceshipWidget(4, 1270, 250, 300, 300, 0, 0.15, 'assets/image/spaceship4.png', drawer, 3);
  addWidgetToScreen(spaceWidget4);
}

function buildGame() {
  removeWidgets();

  const drawer = new Drawer(WINDOW_WIDTH, WINDOW_HEIGHT);
  drawer.prepareDrawer('assets/image/background.jpg');

  initPlayers(drawer);

  initPlanets();
}

export default function buildMenu() {
  $('#example-container').append('<h1> Alliances et Trahisons</h1>');
  $('#example-container').append('<div align="center" style="margin:50px;"><canvas id="canvas"></canvas></div>');
  QRCode.toCanvas(document.getElementById('canvas'), '192.168.2.1');

  $('#example-container').append('<button id="user-test" class="menu-button"> Lancer le jeu </button></br>');

  $('#user-test').on('click', () => {
    buildGame();
  });
}
