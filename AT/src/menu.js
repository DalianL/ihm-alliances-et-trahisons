/**
 * @author Loïc Dalian
 * @author Matthieu Barzellino
 */

// Import JQuery
import $ from 'jquery/dist/jquery.min';
import LibraryStack from 'tuiomanager/widgets/Library/LibraryStack/LibraryStack';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from 'tuiomanager/core/constants';
import SpaceshipWidget from './spaceshipWidget';
import Drawer from './drawer';
// import Planet from './planet';

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

  // const planet1 = new Planet(0, 0, 610, 1080, 0, 0, 'assets/image/planet1.jpg');
  // const planet2 = new Planet(600, 0, 613, 399, 0, 0, 'assets/image/planet2.jpg');
  // const planet3 = new Planet(500, 700, 764, 391, 0, 0, 'assets/image/planet3.jpg');
  // const planet4 = new Planet(1200, 0, 734, 1080, 0, 0, 'assets/image/planet4.jpg');
  // const planet5 = new Planet(600, 350, 720, 391, 0, 0, 'assets/image/planet5.jpg');
  // addWidgetToScreen(planet1);
  // addWidgetToScreen(planet2);
  // addWidgetToScreen(planet3);
  // addWidgetToScreen(planet4);
  // addWidgetToScreen(planet5);

  const stack = new LibraryStack(5, 15, 525, '', 'blue', 'blue', false, ['ImageElementWidget']);
  addWidgetToScreen(stack);

  const stack2 = new LibraryStack(780, 15, 380, '', 'red', 'red', false, ['ImageElementWidget']);
  addWidgetToScreen(stack2);

  const stack3 = new LibraryStack(580, 431, 280, '', 'red', 'red', false, ['ImageElementWidget']);
  addWidgetToScreen(stack3);

  const stack4 = new LibraryStack(1305, 340, 525, '', 'green', 'green', false, ['ImageElementWidget']);
  addWidgetToScreen(stack4);

  const stack5 = new LibraryStack(900, 850, 180, '', 'yellow', 'yellow', false, ['ImageElementWidget']);
  addWidgetToScreen(stack5);
}

export default function buildMenu() {
  // $('#example-container').append('<h1> Alliances et Trahisons</h1>');
  // $('#example-container').append('<button id="user-test" class="menu-button"> Lancer le jeu </button></br>');

  // $('#user-test').on('click', () => {
  //   buildGame();
  // });

  buildGame();
}
