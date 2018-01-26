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

  const spaceWidget = new SpaceshipWidget(230, 230, 700, 700, 0, 0.15, 'assets/image/spaceship1.jpg', drawer);
  addWidgetToScreen(spaceWidget);

  const planet1 = new Planet(1, 5, 15, 525, '', 'blue', 'blue', false, ['ImageElementWidget']);
  addWidgetToScreen(planet1);

  const planet2 = new Planet(2, 780, 15, 380, '', 'red', 'red', false, ['ImageElementWidget']);
  addWidgetToScreen(planet2);

  const planet3 = new Planet(3, 580, 431, 280, '', 'red', 'red', false, ['ImageElementWidget']);
  addWidgetToScreen(planet3);

  const planet4 = new Planet(4, 1305, 340, 525, '', 'green', 'green', false, ['ImageElementWidget']);
  addWidgetToScreen(planet4);

  const planet5 = new Planet(5, 900, 850, 180, '', 'yellow', 'yellow', false, ['ImageElementWidget']);
  addWidgetToScreen(planet5);
}

export default function buildMenu() {
  // $('#example-container').append('<h1> Alliances et Trahisons</h1>');
  // $('#example-container').append('<button id="user-test" class="menu-button"> Lancer le jeu </button></br>');

  // $('#user-test').on('click', () => {
  //   buildGame();
  // });

  buildGame();
}
