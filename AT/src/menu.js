/**
 * @author Loïc Dalian
 * @author Matthieu Barzellino
 */

// Import JQuery
import $ from 'jquery/dist/jquery.min';
import QRCode from 'qrcode';
import Planet from './planet';
import GameCore from './gameCore';

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

function initPlayers(core) {
  core.createPlayer(1);
  core.addSpaceship(1, 265, 220);

  core.createPlayer(2);
  core.addSpaceship(2, 825, 160);

  core.createPlayer(3);
  core.addSpaceship(3, 545, 850);

  core.createPlayer(4);
  core.addSpaceship(4, 1270, 250);
}

function buildGame() {
  removeWidgets();

  const core = new GameCore();
  core.initMap();

  initPlayers(core);

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
