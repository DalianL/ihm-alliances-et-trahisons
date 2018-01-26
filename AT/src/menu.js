/**
 * @author Loïc Dalian
 * @author Matthieu Barzellino
 */

// Import JQuery
import $ from 'jquery/dist/jquery.min';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from 'tuiomanager/core/constants';
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

function buildGame() {
  removeWidgets();

  const drawer = new Drawer(WINDOW_WIDTH, WINDOW_HEIGHT);
  drawer.prepareDrawer('assets/image/background.jpg');

  const spaceWidget = new SpaceshipWidget(265, 220, 300, 300, 0, 0.15, 'assets/image/spaceship1.jpg', drawer);
  addWidgetToScreen(spaceWidget);

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

export default function buildMenu() {
  // $('#example-container').append('<h1> Alliances et Trahisons</h1>');
  // $('#example-container').append('<button id="user-test" class="menu-button"> Lancer le jeu </button></br>');

  // $('#user-test').on('click', () => {
  //   buildGame();
  // });

  buildGame();
}
