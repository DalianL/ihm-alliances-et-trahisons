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

  core.addPlanet(5, -1, 1710, 807, 100);
  core.addPlanet(6, -1, 930, 822, 220);
  core.addPlanet(7, -1, 12, 27, 90);
  core.addPlanet(8, -1, 234, 510, 65);
  core.addPlanet(9, -1, -120, 830, 310);
  core.addPlanet(10, -1, 1280, 590, 180);
  core.addPlanet(11, -1, 658, 385, 95);
  core.addPlanet(12, -1, 1189, -20, 110);
  core.addPlanet(13, -1, 1489, 86, 85);
  core.addPlanet(14, -1, 1520, 476, 70);
  core.addPlanet(15, -1, 1634, 226, 140);
  core.addPlanet(16, -1, 1744, 82, 60);
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

  core.addMenu();
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
