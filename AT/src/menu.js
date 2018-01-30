/**
 * @author Loïc Dalian
 * @author Matthieu Barzellino
 */

// Import JQuery
import $ from 'jquery/dist/jquery.min';
import QRCode from 'qrcode';
import GameCore from './gameCore';

let widgets = [];

// function addWidgetToScreen(widget) {
// //  $('#example-container').append(widget.domElem);
//   widget.addTo('#example-container');
//   widgets.push(widget);
// }// AddWidgetToScreen()

function removeWidgets() {
  $('#example-container').empty();
  for (let i = 0; i < widgets.length; i += 1) {
    widgets[i].deleteWidget();
  }
  widgets = [];
}

function initPlanets(core) {
  core.addPlanet(1, 1, 230, 185, 95);
  core.addPlanet(2, 2, 770, 102, 135);
  core.addPlanet(3, 3, 500, 810, 110);
  core.addPlanet(4, 4, 1225, 209, 110);

  core.addPlanet(-1, 5, 1710, 807, 100);
  core.addPlanet(-1, 6, 930, 822, 220);
  core.addPlanet(-1, 7, 12, 27, 90);
  core.addPlanet(-1, 8, 234, 510, 65);
  core.addPlanet(-1, 9, -120, 830, 310);
  core.addPlanet(-1, 10, 1280, 590, 180);
  core.addPlanet(-1, 11, 658, 385, 95);
  core.addPlanet(-1, 12, 1189, -20, 110);
  core.addPlanet(-1, 13, 1489, 86, 85);
  core.addPlanet(-1, 14, 1520, 476, 70);
  core.addPlanet(-1, 15, 1634, 226, 140);
  core.addPlanet(-1, 16, 1744, 82, 60);
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

  initPlanets(core);
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
