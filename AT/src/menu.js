/**
 * @author Kevin Duglué
 * @author Rémy Kaloustian
 */

// Import JQuery
import $ from 'jquery/dist/jquery.min';
import LibraryStack from 'tuiomanager/widgets/Library/LibraryStack/LibraryStack';
import SpaceshipWidget from './spaceshipWidget';
import Planet from './planet';
// import ImageElementWidget from 'tuiomanager/widgets/ElementWidget/ImageElementWidget/ImageElementWidget';

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

function buildBackButton() {
  $('#example-container').append('<button id="back-button">Back</button>');
  $('#back-button').on('click', () => {
    removeWidgets();
    /* eslint-disable no-use-before-define */
    buildMenu();
    /* eslint-enable no-use-before-define */
  });
}//  displayMenu()

function buildGame() {
  removeWidgets();
  buildBackButton();

  const spaceWidget = new SpaceshipWidget(50, 50, 640, 960, 10, 0.1, 'assets/image/rocket.png', 1000, 'B3', 'C9', '38', '6');
  addWidgetToScreen(spaceWidget);

  // const imageWidget1 = new ImageElementWidget(50, 50, 640, 960, 10, 0.1, 'assets/image/rocket.png', 1000, 'B3', 'C9', '38', '6');
  // addWidgetToScreen(imageWidget1);
  const planet1 = new Planet(0, 0, 610, 1080, 0, 0, 'assets/image/planet1.jpg', 'B3', 'C9', '38', '6');
  const planet2 = new Planet(600, 0, 613, 399, 0, 0, 'assets/image/planet2.jpg', 'B3', 'C9', '38', '6');
  const planet3 = new Planet(500, 700, 764, 391, 0, 0, 'assets/image/planet3.jpg', 'B3', 'C9', '38', '6');
  const planet4 = new Planet(1200, 0, 734, 1080, 0, 0, 'assets/image/planet4.jpg', 'B3', 'C9', '38', '6');
  const planet5 = new Planet(600, 350, 720, 391, 0, 0, 'assets/image/planet5.jpg', 'B3', 'C9', '38', '6');
  addWidgetToScreen(planet1);
  addWidgetToScreen(planet2);
  addWidgetToScreen(planet3);
  addWidgetToScreen(planet4);
  addWidgetToScreen(planet5);

  const stack = new LibraryStack(0, 15, 590, 'PLAYER 1', 'blue', 'blue', false, ['ImageElementWidget']);
  addWidgetToScreen(stack);

  const stack2 = new LibraryStack(780, 15, 340, 'PLAYER 2', 'red', 'red', false, ['ImageElementWidget']);
  addWidgetToScreen(stack2);

  const stack3 = new LibraryStack(650, 405, 280, 'PLAYER 2', 'red', 'red', false, ['ImageElementWidget']);
  addWidgetToScreen(stack3);

  const stack4 = new LibraryStack(1308, 413, 540, 'PLAYER 3', 'green', 'green', false, ['ImageElementWidget']);
  addWidgetToScreen(stack4);

  const stack5 = new LibraryStack(900, 850, 180, 'PLAYER 4', 'yellow', 'yellow', false, ['ImageElementWidget']);
  addWidgetToScreen(stack5);
}

export default function buildMenu() {
  $('#example-container').append('<h1> Alliances et Trahisons</h1>');
  $('#example-container').append('<button id="user-test" class="menu-button"> Lancer le jeu </button></br>');

  $('#user-test').on('click', () => {
    buildGame();
  });
}
